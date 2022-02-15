const displayTitle = () => {
    let title = document.getElementsByName(`gameTitle`);
    for(i = 0; i < title.length; i++) {
        if(title[i].checked)
        console.log(title);
        document.getElementById("titleDisplay").innerHTML = html
            = title[i].value;
    }
}
