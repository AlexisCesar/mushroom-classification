document.addEventListener('DOMContentLoaded', function(){  
    //btn event appear
    let btn_main = document.getElementById('btn-main');

    btn_main.classList.add('active');

    //title btn appear
    document.getElementById('title-main').classList.add('active');

    //background event appear
    setTimeout(function() {
        document.getElementById('background').classList.add('active');
        document.getElementById('stars').classList.add('active');
        document.getElementById('stars2').classList.add('active');
    }, 1000);
});