function loadJSON(path, callback) {

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', path, true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}

Handlebars.registerHelper('if_eq', function(a, b, opts) {
    if(a.toLowerCase() === b.toLowerCase())
        return opts.fn(this);
    else
        return opts.inverse(this);
});

function renderSection(sourceId, targetId, dataPath){
    var source = document.getElementById(sourceId).innerHTML;
    var target = document.getElementById(targetId);
    var template = Handlebars.compile(source);
    loadJSON(dataPath, function(response){
        var data = JSON.parse(response);
        target.innerHTML = template(data);
    });
};




