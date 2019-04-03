
import eventlet
import socketio
import datetime
import csv
import socket
import os

localhost = (([ip for ip in socket.gethostbyname_ex(socket.gethostname())[2] if not ip.startswith("127.")] or [[(s.connect(("8.8.8.8", 53)), s.getsockname()[0], s.close()) for s in [socket.socket(socket.AF_INET, socket.SOCK_DGRAM)]][0][1]]) + ["no IP found"])[0]

sio = socketio.Server()
app = socketio.WSGIApp(sio, static_files={
    '/': {'content_type': 'text/html', 'filename': 'index.html'},
    '/index.css': {'content_type': 'text/css', 'filename': 'index.css'},
    '/index.js': {'content_type': 'text/javascript', 'filename': 'index.js'},
    '/vue.js': {'content_type': 'text/javascript', 'filename': 'vue.js'},
})

hold_log = [["Connection Time", "ID", "SID", "Disconnection Time"]]

@sio.on('connect')
def connect(sid, environ):
    print(environ['REMOTE_ADDR']+ ' Connected at ' + str(datetime.datetime.now()))
    hold_log.append([str(datetime.datetime.now()), environ['REMOTE_ADDR'], sid])


@sio.on('disconnect')
def disconnect(sid):
    writer = csv.writer(open('Log.csv', 'a'))
    for row in hold_log:
        if(row[2] == sid):
            row.append(str(datetime.datetime.now()))
            writer.writerow(row)
    print(sid + ' Disconnected at ' + str(datetime.datetime.now()))


if __name__ == '__main__':

    print("Server starting at: http://" + localhost + ":5000")
    eventlet.wsgi.server(eventlet.listen(('', 5000)), app)