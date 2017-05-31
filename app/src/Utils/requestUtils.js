import $ from 'jquery'

function postData(_url, _headers, _body,_callback) {
    $.ajax({
        type: "POST",
        headers: _headers,
        url: _url,
        data: _body,
        complete: _callback,
        dataType: "json"
    });
}

function getData(_url, _headers, _callback) {
    $.ajax({
        type: "GET",
        headers: _headers,
        url: _url,
        complete: _callback,
        dataType: "json"
    });
}

export {postData, getData};