import cv2
import numpy as np

draw = False
ix = -1
iy = -1
class DrawLineWidget(object):
    def __init__(self):
        array = np.zeros([500, 500, 3],
                 dtype = np.uint8)
        array[:, :] = [255, 255, 255] 
        self.original_image = array
        self.clone = self.original_image.copy()
        self.height = 500
        self.width = 500
        cv2.namedWindow('image')
        cv2.setMouseCallback('image', self.extract_coordinates)

    def recursiveFillColor(self,x,y,color):
        print(type(self.clone[y][x]))
        if 0 <= x and x <= self.width - 1 and 0 <= y and y <= self.height - 1 and np.all(self.clone[y][x]) != np.all([0,0,255]):
            borderColor = np.all([0,0,255])
            i = x
            j = x
            while np.all(self.clone[y][i]) != borderColor:
                    self.clone[y][i] = [255,0,255]
                    i += 1
            while np.all(self.clone[y][j]) != borderColor:
                    self.clone[y][j] = [255,0,255]
                    j -= 1
            self.recursiveFillColor(x,y + 1, 123)
            self.recursiveFillColor(x,y - 1, 123)
    def extract_coordinates(self, event, x, y, flags, parameters):
        global ix
        global iy
        global draw 
        if event == cv2.EVENT_LBUTTONDOWN:
            draw = True
            ix = x
            iy = y
        if event == cv2.EVENT_MOUSEMOVE :
            if draw:
                cv2.line(self.clone,(ix,iy),(x,y),(0,0,255),3)
                ix = x
                iy = y
        if event == cv2.EVENT_LBUTTONUP:
            draw = False
        if event == cv2.EVENT_RBUTTONDOWN:
            self.recursiveFillColor(x, y, [0,255,0])

        cv2.imshow("image", self.clone) 

    def show_image(self):
        return self.clone

if __name__ == '__main__':
    draw_line_widget = DrawLineWidget()
    while True:
        cv2.imshow('image', draw_line_widget.show_image())
        key = cv2.waitKey(1)
        if key == ord('q'):
            cv2.destroyAllWindows()
            exit(1)