$( function () {
    const X_range = [-4.0, -3.0, -2.0, -1.0, 0.0, 1.0, 2.0, 3.0, 4.0];
    const Y_min = -3, Y_max = 3;
    const R_range = [1, 2, 3, 4, 5];

    let xval;
    let yval;
    let rval = "R";

    const canvas = document.getElementById("canvas");
    let ctx = canvas.getContext('2d');
    let elemLeft = canvas.offsetLeft + canvas.clientLeft,
        elemTop = canvas.offsetTop + canvas.clientTop,
        w = parseInt(canvas.width),
        h = parseInt(canvas.height);
    let info = document.getElementById("info");

    function isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    function validateX() {
        xval = $('#x-value').val();

        if (isNumeric(xval) && X_range.includes(parseFloat(xval))) {
            info.text('Введите координаты точки')
            return true;
        } else {
            info.text('Выберите значение X!')
            return false;
        }
    }

    function validateY() {
        yval = $('#y-value').val();

        if (isNumeric(yval) && yval >= Y_min && yval <= Y_max)
        {
            info.text('Введите координаты точки')
            return true;
        } else {
            info.text(`Введите значение Y от ${Y_min} до ${Y_max}!`)
            return false;
        }
    }

    function validateR() {
        rval = parseFloat($('.ui-inputfield')[0].value);
        // console.log(isNumeric(rval) + " " + R_range.includes(parseFloat(rval)));
        if (isNumeric(rval) && R_range.includes(parseFloat(rval))) {
            info.innerHTML = 'Введите координаты точки';
            return true;
        } else {
            info.innerHTML = 'Выберите значение R!';
            return false;
        }
    }

    function validateForm() {
        return validateX() && validateY() && validateR();
    }

    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function buildPlot(){
        ctx.fillStyle = '#0080FF';
        ctx.clearRect(0, 0, w, h);
        // //Пусть максимум по X и Y - Width и Height -40px
        let x = w;
        let y = h;

        // //1 сектор
        ctx.beginPath();
        ctx.moveTo(w/2,h/2);
        ctx.lineTo(w/2,h/2+y/4);
        ctx.lineTo(0,h/2);
        ctx.lineTo(w/2,h/2);
        ctx.lineTo(w/2+x/4,h/2);
        ctx.fill();

        // //3 сектор
        ctx.moveTo(w/2,h/2);
        ctx.arc(w/2,h/2,x/4,0,Math.PI/2);
        ctx.fill();

        // //4 сектор
        ctx.beginPath();
        ctx.fillRect(0,h/4,x/2,y/4);
        ctx.fill();

        //Направляющие оси
        //Y
        ctx.beginPath();
        ctx.moveTo(w/2,h);
        ctx.lineTo(w/2,0);
        ctx.moveTo(w/2,0);
        ctx.lineTo(w/2-5,10);
        ctx.moveTo(w/2,0);
        ctx.lineTo(w/2+5,10);
        ctx.stroke();
        //X
        ctx.beginPath();
        ctx.moveTo(0,h/2);
        ctx.lineTo(w,h/2);
        ctx.moveTo(w,h/2);
        ctx.lineTo(w-10,h/2+5);
        ctx.moveTo(w,h/2);
        ctx.lineTo(w-10,h/2-5);
        //риски для делений
        //X
        ctx.moveTo(w/2+x/4,h/2+5);
        ctx.lineTo(w/2+x/4,h/2-5);
        ctx.moveTo(w/2+x/2,h/2+5);
        ctx.lineTo(w/2+x/2,h/2-5);
        ctx.moveTo(w/2-x/4,h/2+5);
        ctx.lineTo(w/2-x/4,h/2-5);
        ctx.moveTo(w/2-x/2,h/2+5);
        ctx.lineTo(w/2-x/2,h/2-5);
        //Y
        ctx.moveTo(w/2+5,h/2-y/4);
        ctx.lineTo(w/2-5,h/2-y/4);
        ctx.moveTo(w/2+5,h/2-y/2);
        ctx.lineTo(w/2-5,h/2-y/2);
        ctx.moveTo(w/2+5,h/2+y/4);
        ctx.lineTo(w/2-5,h/2+y/4);
        ctx.moveTo(w/2+5,h/2+y/2);
        ctx.lineTo(w/2-5,h/2+y/2);
        ctx.stroke();

        //Легенда
        ctx.fillStyle = '#000';
        ctx.font = '15px serif';
        ctx.fillText('x',w-10,h/2+15);
        ctx.fillText('y',w/2-15,10);

        ctx.font = '16px serif';
        ctx.fillText(rval+'/2',w/2 + x/4 - 10,h/2 - 10);
        ctx.fillText(rval,w/2 + x/2 - 15,h/2 - 10);
        ctx.fillText('-'+rval+'/2',w/2 - x/4 - 14,h/2 - 10);
        ctx.fillText('-'+rval,w/2 - x/2,h/2 - 10);
        ctx.fillText(rval+'/2',w/2+10,h/2-y/4 + 5);
        ctx.fillText(rval,w/2+10,h/2-y/2 + 15);
        ctx.fillText('-'+rval+'/2',w/2+10,h/2+y/4 + 5);
        ctx.fillText('-'+rval,w/2+10,h/2+y/2 - 5);
    }

    function drawDotsFromTable(){
        let rows = [];
        let headers = $("#results th");

        $("#results tr").each(function(index) {
            console.log("res tr")
            let cells = $(this).find("td");
            rows[index] = {};
            cells.each(function(cellIndex) {
                rows[index][$(headers[cellIndex]).html()] = $(this).html().replace(/\s/g, "");
            });
        });

        for (let i = 1; i < rows.length; i++) {
            drawDot(
                rows[i]['X'],
                rows[i]['Y'],
                rows[i]['R'],
                rows[i]['Result']);
            console.log("X "+rows[i]['X']+
                " Y " + rows[i]['Y']+
                " R "+rows[i]['R']+
                " Res " + rows[i]['Result'] )
        }
    }

    function drawDot(x, y, r, isHit){
        console.log(x, y, r, isHit)

        if (x<0){
            if((Math.abs(x)/r) > 1)
                x = 0;
            else
                x = 150 - Math.abs(x)/r * w/2;
        }else if(x >= 0){
            if(x/r > 1)
                x = w;
            else
                x = 150 + Math.abs(x)/r * w/2;
        }

        if (y >= 0){
            if(y/r > 1)
                y = 0;
            else
                y = 150 - y/r * h/2;
        }else if(y < 0){
            if(Math.abs(y)/r > 1)
                y = h;
            else
                y = 150 + Math.abs(y)/r * w/2;
        }

        console.log("DotPX x " + x + " y " + y);
        console.log("hit check" + (isHit === "false"))

        ctx.beginPath();
        isHit === "true" ?  ctx.fillStyle = 'green' : ctx.fillStyle = 'red';
        ctx.arc(x, y, 2, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();

        console.log("Dot set!")
    }

    // function canvasOnClickDot(x, y){
    //     ctx.beginPath();
    //     ctx.arc(x, y, 2, 0, 2 * Math.PI);
    //     ctx.stroke();
    //     ctx.fill();
    // }


    canvas.addEventListener('click', function(event) {
        let x = (event.pageX - elemLeft)
        let y = Number((event.pageY - elemTop));
        //да, мне стыдно за этот костыль, но он работает
        //для R
        let r = $('.ui-inputfield')[0].value;
        // console.log('Px. x: ' + event.pageX + ' y: ' + event.pageY);
        // console.log('Px. elL: ' + elemLeft + ' elT: ' + elemTop);
        console.log('Px. X: ' + x + ' Y: ' + y+ ' R:' +r);
        if(validateR()){
            if(x/300 > 0.5)
                x = Math.round(((x-150)/150*rval + Number.EPSILON)*10)/10;
            else
                x = Math.round((-(1-x/150)*rval +Number.EPSILON)*10)/10;

            if (y/300 <= 0.5)
                y = Math.round(-(y-150)/150*rval + Number.EPSILON);
            else
                y = Math.round((1-y/150)*rval + Number.EPSILON);
            console.log("parsed x: " + x + " parsed y: " + y);

            document.getElementsByClassName('x-val')[0].value = x;
            let allY = document.querySelectorAll('input[type="radio"]');
            for (let i = 0; i < allY.length; i++) {
                if (allY[i].value == y)
                    allY[i].checked = true;
            }
            $(".sendButton").click();
        }



        // canvasOnClickDot(x,y);


        // console.log($('.ui-inputfield')[0].value);
    });

    // $(".r-val").change(function(){
    //     let a = document.getElementsByClassName("r-val")
    //     rval = a[0].value
    //     **redraw canvas**
    // })

    $(".sendButton").on('click', function (){
        console.log("Нажата");
        setTimeout(drawDotsFromTable,1000);
    })



    clearCanvas();
    buildPlot();
    drawDotsFromTable();
});