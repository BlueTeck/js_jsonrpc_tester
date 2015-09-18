$(function() {

    var request = '{"jsonrpc": "2.0", "method": "getMe", "id": 123}';
    $('#request').val(request);

    var password = 'demo123';
    $('#token').val(password);

    var user = 'demo';
    $('#user').val(user);

    var url = 'http://demo.kanboard.net/jsonrpc.php';
    $('#url').val(url);

    $('#test').click(function() {
        request = $('#request').val();
        password = $('#token').val();
        url = $('#url').val();
        user = $('#user').val();
        console.log(user + " " + password + " " + url);
        $.ajax({
            url: url,
            type: 'POST',
            dataType: 'json',
            crossDomain: true,
            data: request,
            beforeSend: function(xhr) {
                var auth = Base64.encode(user + ':' + password);
                xhr.setRequestHeader("Authorization", "Basic " + auth);
            },
            success: function(data) {
                var result = data.result;
                $('#json-renderer').jsonViewer(result);
            },
            error: function(data) {
                $('#status').text('error, check console');

            }
        });
    });
});