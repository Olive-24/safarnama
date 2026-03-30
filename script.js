var selectedCity="";
function selectCity(city){
    selectedCity=city;
    document.querySelector('.form-section').scrollIntoView({behavior:"smooth"});
}
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
    var prompt="Plan a" + days + "day trip to" + selectedCity + "for a" + budget + "budget traveller who loves" + style + ". Give day-by-day itinerary with morning, afternoon, evening activities.";
    fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + apiKey
        },
        body: JSON.stringify({
        model: "nvidia/nemotron-3-super-120b-a12b:free",
        messages: [{
            role: "user",
            content: prompt
        }]
        })
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
    console.log(data);
    if(data.choices && data.choices[0]) {
        var result = data.choices[0].message.content;
        document.querySelector('.result').innerHTML = result
            .replace(/### (.*)/g, '<h3>$1</h3>')
            .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
            .replace(/\n/g, '<br>');
        document.getElementById('save-btn').style.display='block';
        document.getElementById('save-btn').onclick=function(){
            saveTrip(selectedCity,days,budget,style,result);
        }
        document.querySelector('button').disabled = false;
    } else {
        document.querySelector('.result').innerHTML = "Something went wrong, try again!";
        document.querySelector('button').disabled = false;
    }
    })
})