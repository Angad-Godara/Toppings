from flask import Flask
from flask_cors import CORS
import requests
import os
from datetime import timedelta
import isodate
import json

app = Flask(__name__)
CORS(app)

API_KEY = os.environ['API_KEY']
playlistsAPI = 'https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&maxResults=50&fields=items/contentDetails/videoId,nextPageToken&key={}&playlistId={}&pageToken='
videoAPI = 'https://www.googleapis.com/youtube/v3/videos?&part=contentDetails&id={}&key={}&fields=items/contentDetails/duration'


# To parse the datetime object into readable time
def parse(duration):
    ts, td = duration.seconds, duration.days
    th, tr = divmod(ts, 3600)
    tm, ts = divmod(tr, 60)
    ds = ''
    if td:
        ds += ' {} day{},'.format(td, 's' if td != 1 else '')
    if th:
        ds += ' {} hour{},'.format(th, 's' if th != 1 else '')
    if tm:
        ds += ' {} minute{},'.format(tm, 's' if tm != 1 else '')
    if ts:
        ds += ' {} second{}'.format(ts, 's' if ts != 1 else '')
    if ds == '':
        ds = '0 seconds'
    return ds.strip().strip(',')


@app.route('/v1/playlists/<playlist_id>', methods=['GET'])
def playlistsAPIHandler(playlist_id):
    playlist_id = playlist_id
    next_page = ''  # to store next_page token, empty for first page
    # initializing variables
    count = 0  # to store total number of videos in playlist
    duration = timedelta(0)  # to store total duration of a playlist
    metadata = []  # list to contain metadata
    response = {}

    while True:
        vid_list = []
        try:
            # make first request to get list of all video_id one page of response
            results = json.loads(requests.get(
                playlistsAPI.format(API_KEY, playlist_id) + next_page).text)

            # add all ids to vid_listf
            for x in results['items']:
                vid_list.append(x['contentDetails']['videoId'])
        except KeyError:
            metadata = [results['error']['message']]
            break

        # now vid_list contains list of all videos in playlist one page of response
        url_list = ','.join(vid_list)
        # updating counter
        count += len(vid_list)

        try:
            # now to get the durations of all videos in url_list
            op = json.loads(requests.get(
                videoAPI.format(url_list, API_KEY)).text)
            # add all the durations to a
            for x in op['items']:
                duration += isodate.parse_duration(
                    x['contentDetails']['duration'])
        except KeyError:
            metadata = [results['error']['message']]
            break

        # if 'nextPageToken' is not in results, it means it is the last page of the response
            # otherwise, or if the count has not yet exceeded 500
        if 'nextPageToken' in results:
            next_page = results['nextPageToken']
        else:
            if count >= 500:
                metadata = ['No of videos limited to 500.']
            response = {
                'count': str(count),
                'avg_len':  parse(duration / count),
                'duration': parse(duration),
            }
            break

    return {"metadata": metadata, **response}


if __name__ == '__main__':
    app.run(debug=True)
