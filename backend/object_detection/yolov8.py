import cv2
import argparse
from ultralytics import YOLO
import supervision as sv
import numpy as np
import time

def parse_arguments() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="YOLOv8 live")
    parser.add_argument(
        "--webcam-resolution",
        default = [1280, 720],
        nargs = 2,
        type = int
    )
    args = parser.parse_args()
    return args

def main():
    args = parse_arguments() 
    frame_width, frame_height = args.webcam_resolution
    
    cap = cv2.VideoCapture(0)
    cap.set(cv2.CAP_PROP_FRAME_WIDTH, 1280) 
    cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 720)
    #replace 1280 with frame_width and 720 with frame_height if you want to use the parse-arguments function
    
    model = YOLO("yolov8n.pt")
    
    box_annotator = sv.BoxAnnotator(
        thickness = 2,
        text_thickness = 2,
        text_scale = 1
    )
    
    while True:
        start_time = time.perf_counter()
        
        ret, frame = cap.read()
        
        result= model(frame)[0]
        
        detections = sv.Detections.from_yolov8(result)
        labels = [
            f"{model.model.names[class_id]} {confidence:0.2f}"
            for _, confidence, class_id, _ 
            in detections
        ]
        
        frame = box_annotator.annotate(scene=frame,detections=detections,labels=labels)
        
        end_time = time.perf_counter()
        fps = 1/ (end_time - start_time)
            
        cv2.putText(frame, f"FPS: {fps:.2f}",(20,70), cv2.FONT_HERSHEY_SIMPLEX, 1, (0,255,0), 2)
        
        if not ret: break
        cv2.imshow("yolov8",frame)
        
        # print(frame.shape)
        # break
        
        if cv2.waitKey(1) == 27 or cv2.getWindowProperty("yolov8", cv2.WND_PROP_VISIBLE) < 1:
            break
        
    # cap.release()
    # cv2.destroyAllWindows()
if __name__ == '__main__':
    main()