document.querySelector('form').addEventListener('submit',function(e){
    e.preventDefault();
    var days=document.querySelector('input').value;
    var budget=document.querySelectorAll('select')[0].value;
    var style=document.querySelectorAll('select')[1].value;
    if(days==''||days==0){
        alert('Please enter no. of days!');
        return;
    }
    document.querySelector('button').disabled = true;
    document.querySelector('.result').innerHTML = "Planning your trip...";
    var prompt="Plan a" + days + "day trip to" + "for a" + budget + "budget traveller who loves" + style + ". Give day-by-day itinerary with morning, afternoon, evening activities.";
    fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + apiKey, {
        method:"POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            contents: [{
                parts: [{ text: prompt }]
            }]
        })
    })
    .then(function(response) {
        return response.json();
        })
        .then(function(data) {
        console.log(data);
        if(data.candidates && data.candidates[0]) {
            var result = data.candidates[0].content.parts[0].text;
            document.querySelector('.result').innerHTML = result;
        } else {
            document.querySelector('.result').innerHTML = "Something went wrong, try again!";
            document.querySelector('button').disabled = false;
        }
    })
})