from yolov5.models.common import DetectMultiBackend
from yolov5.utils.augmentations import letterbox
from yolov5.utils.general import check_img_size, non_max_suppression, resize_img, scale_coords
import cv2
import numpy as np
import torch
from yolov5.utils.plots import Annotator, colors
from yolov5.utils.torch_utils import select_device
import time
import base64
from flask import Flask, render_template, request, send_file
from PIL import Image
import io
import argparse
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

ENDPOINT_URL = "/v1/aeye_detection/best/predict"
ANNOTATE_URL = "/v1/aeye_detection/best/annotate"
PRETRAIN_ANNOTATE = "/v1/aeye_detection/yolov5s/annotate"
PRETRAIN_PREDICT = "/v1/aeye_detection/yolov5s/predict"
ENDPOINT_B64_URL = "/v1/aeye_detection/best/predict/b64"
ANNOTATE_B64_URL = "/v1/aeye_detection/best/annotate/b64"

@app.route("/", methods=["GET"])
def index():
    return render_template("index.html")

@app.route(ENDPOINT_URL, methods=["POST"])
def predict():
    if request.method != "POST":
        return "not post"

    if request.files.get("image"):
        print('got file')
        im_file = request.files["image"]
        im_bytes = im_file.read()
        img = Image.open(io.BytesIO(im_bytes))
        temp_path = "./predict_temp.jpg"
        img.save(temp_path)
        res, annotate = detect(img=temp_path)
        return res
    return "no image"

@app.route(ANNOTATE_URL, methods=["POST"])
def annotate():
    if request.method != "POST":
        return "Invalid Request"

    if request.files.get("image"):
        print('got file')
        im_file = request.files["image"]
        im_bytes = im_file.read()
        img = Image.open(io.BytesIO(im_bytes))
        temp_path = "./predict_temp.jpg"
        img.save(temp_path)
        res, annotate = detect(img=temp_path)
        file_obj = io.BytesIO()
        annotate.save(file_obj, "JPEG")
        file_obj.seek(0)
        return send_file(file_obj, mimetype='image/jpeg')

    return "no image"

@app.route(PRETRAIN_ANNOTATE, methods=["POST"])
def pretrain_annotate():
    if request.method != "POST":
        return "Invalid Request"

    if request.files.get("image"):
        print('got file')
        im_file = request.files["image"]
        im_bytes = im_file.read()
        img = Image.open(io.BytesIO(im_bytes))
        temp_path = "./predict_temp.jpg"
        img.save(temp_path)
        res, annotate = detect(weights='yolov5s.pt', img=temp_path)
        file_obj = io.BytesIO()
        annotate.save(file_obj, "JPEG")
        file_obj.seek(0)
        return send_file(file_obj, mimetype='image/jpeg')

    return "no image"

@app.route(PRETRAIN_PREDICT, methods=["POST"])
def pretrain_predict():
    if request.method != "POST":
        return "not post"

    if request.files.get("image"):
        print('got file')
        im_file = request.files["image"]
        im_bytes = im_file.read()
        img = Image.open(io.BytesIO(im_bytes))
        temp_path = "./predict_temp.jpg"
        img.save(temp_path)
        res, annotate = detect(weights='yolov5s.pt', img=temp_path)
        return res
    return "no image"

@app.route(ANNOTATE_B64_URL, methods=["POST"])
@cross_origin()
def annotate_b64():
    if request.method != "POST":
        return "Invalid Request"

    timestamp = time.time()
    payload = request.get_json()
    # Initialise your data
    p = payload["payload"]
    if (p is not None):
        p_clean = p[p.find('/9'):]
        temp_path = './predict_temp_{timestamp}.jpg'
        img = Image.open(io.BytesIO(base64.b64decode(p_clean))).save(temp_path)
        res, annotate = detect(img=temp_path)
        file_obj = io.BytesIO()
        if (isinstance(annotate, np.ndarray)):
            return { "annotate": f"{p}" }
        else:
            annotate.save(file_obj, "JPEG")
            b64encode = base64.b64encode(file_obj.getvalue()).decode("utf-8")
            return { "annotate": f"data:image/jpeg;base64,{b64encode}" }

    return "no image"

@app.route(ENDPOINT_B64_URL, methods=["POST"])
@cross_origin()
def predict_b64():
    if request.method != "POST":
        return "Invalid Request"

    timestamp = time.time()
    payload = request.get_json()
    # Initialise your data
    p = payload["payload"]
    if (p is not None):
        p_clean = p[p.find('/9'):]
        temp_path = './predict_temp_{timestamp}.jpg'
        img = Image.open(io.BytesIO(base64.b64decode(p_clean))).save(temp_path)
        res, annotate = detect(img=temp_path)
        return res
    return "no image"

def detect(
    weights='yolov5/runs/train/yolov5s_results/weights/best.pt',
    device='cpu',
    dnn=False, 
    data='yolov5/data/coco128.yaml', 
    fp16=False,
    img='',
    imgsz=416
):
    model = DetectMultiBackend(
        weights=weights, 
        device=select_device(device), 
        dnn=dnn, 
        data=data)
    stride, names, pt = model.stride, model.names, model.pt
    imgsz = check_img_size(imgsz, s=stride)
    model.warmup(imgsz=(1 , 3, imgsz, imgsz))
    img = cv2.imread(img)
    img = resize_img(img)
    im = letterbox(img, imgsz, stride=stride, auto=pt)[0]
    im = im.transpose((2, 0, 1))[::-1]
    im = np.ascontiguousarray(im)
    im = torch.from_numpy(im).to(select_device(device))
    im = im.float()
    im /= 255
    if len(im.shape) == 3:
        im = im[None]
    pred = model(im, augment=False, visualize=False)
    pred = non_max_suppression(
        pred,
        conf_thres=0.5,
        iou_thres=0.45,
        classes=None,
        agnostic=False,
        max_det=1000)
    res = []
    for i, det in enumerate(pred):
        det[:, :4] = scale_coords(im.shape[2:], det[:, :4], img.shape).round()
        for *xyxy, conf, cls in reversed(det):
            print(f"[{i}]: xyxy: {xyxy[0]}, conf: {conf}, cls: {names[int(cls)]}")
            annotator = Annotator(img, line_width=1, example=str(names))
            annotator.box_label(xyxy, label=f"{names[int(cls)]}: {conf: .2f}", color=colors(int(cls), True))
            res.append({"x1": int(xyxy[0]), "y1": int(xyxy[1]), "x2": int(xyxy[2]), "y2": int(xyxy[3]), "conf": f"{conf}", "label": names[int(cls)]})

    if len(pred[0]) > 0:
        result = annotator.result()
        result = cv2.cvtColor(result, cv2.COLOR_BGR2RGB)
        # cv2.imshow("result", result)
        # cv2.waitKey(0)
        return (res, Image.fromarray(result.astype('uint8')))
    else:
        return ({"msg": f"No features detacted"}, img)
        

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Flask API exposing YOLOv5 model")
    parser.add_argument("--port", default=8005, type=int, help="port number")
    opt = parser.parse_args()

    # Fix known issue urllib.error.HTTPError 403: rate limit exceeded https://github.com/ultralytics/yolov5/pull/7210
    torch.hub._validate_not_a_forked_repo = lambda a, b, c: True

    app.run(host="0.0.0.0", port=opt.port)  # debug=True causes Restarting with stat
