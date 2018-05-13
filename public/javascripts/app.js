$('.datepicker').datepicker();


function showPassword() {
    var x = document.getElementById("m_password");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}

$('.phone').mask("+7 (999) 999-99-99");


$('.driver_iin').on('keyup', function(){

    var val = $(this).val();
    console.log(val);
    if(val.length == 12){
        $.ajax({
            type: 'GET',
            url: '/insurance/kasko/iin/'+val,
            success: function(data) {
                // console.log('Requested iin output => ' + data);
								var str = 11;
                $('.info_driver').html(data);
								$('.send').html(' <input type="hidden" name="class_number" id="class1" value="'+str+'"> ');
            },
            error:  function(xhr, str){
                $('.info_driver').html('Ошибка при получении информации');

            }
        });
    }
});


function calcAuto(){
    var mrp=2405;
    var bp=mrp*1.9;
    var m=1;
    var err = 0;

    var k = 1;

    if ($('.info_vod1').html()=='' || $('.iin1').val().length!='12' || $('#class1').val()==undefined || isNaN($('#class1').val()))
    {
        $('.iin1').focus().css("border","1px solid red");
        err = 1;
    }
    else
    {
        var age = parseInt($('.age1').val());
        var stazh = parseInt($('.stazh1').val());
        var clas = $('#class1').val();

        var k1 = 1;
        if (age == 0 && stazh == 0) k1 =1;
        if (age == 0 && stazh == 1) k1 =1.05;
        if (age == 1 && stazh == 0) k1 =1.05;
        if (age == 1 && stazh == 1) k1 =1.1;

        var k2 = 1;
        switch(clas){
            case 'M':
                k2 = 2.45;
            break;
            case '0':
                k2 = 2.3;
            break;
            case '1':
                k2 = 1.55;
            break;
            case '2':
                k2 = 1.4;
            break;
            case '3':
                k2 = 1;
            break;
            case '4':
                k2 = 0.95;
            break;
            case '5':
                k2 = 0.9;
            break;
            case '6':
                k2 = 0.85;
            break;
            case '7':
                k2 = 0.8;
            break;
            case '8':
                k2 = 0.75;
            break;
            case '9':
                k2 = 0.7;
            break;
            case '10':
                k2 = 0.65;
            break;
            case '11':
                k2 = 0.6;
            break;
            case '12':
                k2 = 0.55;
            break;
            case '13':
                k2 = 0.5;
            break;
        }

        k = k1*k2;



    var reg = ($('.reg1').val());
    if ($('.city1').attr("checked") || $('.city1').attr("disabled"))
        var city = 1;
    else
        var city = 0;

    //console.log(city);
    var srok = ($('.srok1').val());
    var type = ($('.type1').val());
    var z = 1;
    var z1 = 1;
    var z2 = 1;
    if (city==0)
    {
        var z = 0.8;
        switch(reg)
        {
            case '0':
                z = 2.96*z;
            break
            case '1':
                z = 2.2*z;
            break
            case '2':
                z = 1.78*z;
            break
            case '3':
                z = 1.01*z;
            break
            case '4':
                z = 1.96*z;
            break
            case '5':
                z = 1.95*z;
            break
            case '6':
                z = 1.39*z;
            break
            case '7':
                z = 1.33*z;
            break
            case '8':
                z = 1.32*z;
            break
            case '9':
                z = 1.63*z;
            break
            case '10':
                z = 1*z;
            break
            case '11':
                z = 1.35*z;
            break
            case '12':
                z = 1.17*z;
            break
            case '13':
                z = 1.09*z;
            break
            case '14':
                z = 2.69*z;
            break
            case '15':
                z = 1.15*z;
            break
            case '21':
                z = 1.78*z;
            break
            case '31':
                z = 1.01*z;
            break
            case '41':
                z = 1.96*z;
            break
            case '51':
                z = 1.95*z;
            break
            case '61':
                z = 1.39*z;
            break
            case '71':
                z = 1.33*z;
            break
            case '81':
                z = 1.32*z;
            break
            case '91':
                z = 1.63*z;
            break
            case '101':
                z = 1*z;
            break
            case '111':
                z = 1.35*z;
            break
            case '121':
                z = 1.17*z;
            break
            case '131':
                z = 1.09*z;
            break
            case '141':
                z = 2.69*z;
            break
            case '151':
                z = 1.15*z;
            break
case '171':
                z = 1.63*z;
            break
        }
    }
    else
    {
        switch(reg)
        {
            case '0':
                z = 2.96;
            break
            case '1':
                z = 2.2;
            break
            case '2':
                z = 1.78;
            break
            case '3':
                z = 1.01;
            break
            case '4':
                z = 1.96;
            break
            case '5':
                z = 1.95;
            break
            case '6':
                z = 1.39;
            break
            case '7':
                z = 1.33;
            break
            case '8':
                z = 1.32;
            break
            case '9':
                z = 1.63;
            break
            case '10':
                z = 1;
            break
            case '11':
                z = 1.35;
            break
            case '12':
                z = 1.17;
            break
            case '13':
                z = 1.09;
            break
            case '14':
                z = 2.69;
            break
            case '15':
                z = 1.15;
            break
            case '21':
                z = 1.78;
            break
            case '31':
                z = 1.01;
            break
            case '41':
                z = 1.96;
            break
            case '51':
                z = 1.95;
            break
            case '61':
                z = 1.39;
            break
            case '71':
                z = 1.33;
            break
            case '81':
                z = 1.32;
            break
            case '91':
                z = 1.63;
            break
            case '101':
                z = 1;
            break
            case '111':
                z = 1.35;
            break
            case '121':
                z = 1.17;
            break
            case '131':
                z = 1.09;
            break
            case '141':
                z = 2.69;
            break
            case '151':
                z = 1.15;
            break
case '171':
                z = 1.63;
            break
        }
    }

    switch (srok)
    {
        case '0':
            z1 = 1;
        break;
        case '1':
            z1 = 1.1;
        break;
    }
    switch (type)
    {
        case '0':
            z2 = 2.09;
        break;
        case '1':
            z2 = 3.26;
        break;
        case '2':
            z2 = 3.45;
        break;
        case '3':
            z2 = 3.98;
        break;
        case '4':
            z2 = 2.33;
        break;
        case '5':
            z2 = 1;
        break;
        case '6':
            z2 = 1;
        break;
    }
    //console.log(z+'-'+z1+'-'+z2);
    var kz = z*z1*z2;

    if (err==0)
    {
        //console.log(k+'-'+kz);
        var sum = Math.round(bp*k*kz);

        $('.result').html('Стоимость полиса - <span style=" color:#555;">'+sum+' тг*</span>. <br />');
		$('.send').html(' <input type="text" name="ins_price" readonly id="ins_price" value='+sum+'> ');
    }
	}
}

