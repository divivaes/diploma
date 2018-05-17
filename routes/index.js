var express = require('express');
var passport = require('passport');
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var router = express.Router();
var dbconfig = require('./../config/database');
var connection = mysql.createConnection(dbconfig.connection);
var request = require('request');
connection.query('USE ' + dbconfig.database);

var userId = '';

router.get('/', function (req, res, next) {
  res.render('login', {
    title: 'Страница входа',
    message: req.flash('loginMessage')
  })
});

router.get('/login', function(req, res, next) {
  res.render('login', {
    title: 'Страница входа',
    message: req.flash('loginMessage')
  });
});



router.post('/login', passport.authenticate('local-login', {
		successRedirect : '/home', // redirect to the secure profile section
		failureRedirect : '/login', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}), function (req, res, next){
        if (req.body.remember) {
              req.session.cookie.maxAge = 1000 * 60 * 3;
        } else {
              req.session.cookie.expires = false;
        }
        res.redirect('/home');
  });

router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/login');
});

router.get('/home', isLoggedIn, function (req, res, next) {
  var query = "SELECT * FROM ic_announcements";
  connection.query(query, function(err, rows) {
    if (err) {
      console.log('Error selecting : %s' ,err);
    } else {
        res.render('home', {
          url: 'home',
          title: 'Главная страница',
          data: rows,
          userId: req.user.id
        });
     }
  });
});

router.get('/policies', isLoggedIn, function (req, res, next) {
      res.render('policies', {
        title: 'Типы полисов',
        url: 'policies',
        userId: req.user.id
    });
});

router.get('/web', isLoggedIn, function (req, res, next) {
  res.render('web', {
    url: 'web',
    title: 'Работа с клиентами',
    userId: req.user.id
  });
});

router.get('/insurance/news', isLoggedIn, function (req, res, next) {
  var query = "SELECT * FROM ic_news";
  connection.query(query, function(err, rows) {
    if (err) {
      console.log('Error selecting: %s' ,err);
    } else {
      res.render('./news/news', {
        url: 'insurance/news',
        title: 'Новости компании',
        data: rows,
        userId: req.user.id
      }); 
    }
  });
});

router.get('/insurance/news/add', isLoggedIn, function(req, res, next) {
  res.render('./news/add', {
    url: 'insurance/news/add',
    title: 'Добавление новости',
    userId: req.user.id
  });
});

router.post('/insurance/news/add', isLoggedIn, function(req, res, next) {
  var input = JSON.parse(JSON.stringify(req.body));
  var manager_id = req.user.id;
  var currentTime = new Date().toLocaleTimeString();
  var currentDate = new Date().toLocaleDateString();
  var newsDate = currentTime + ' ' + currentDate;
  var data = {
      n_title                : input.n_title,
      n_body                 : input.n_body,
      n_date                 : newsDate,
      n_mgid                 : manager_id,
      n_image_path           : input.image_file
  };
  console.log('Data appearance => ' + data);
  connection.query("INSERT INTO ic_news SET ? ", data, function (err, rows) {
    if (err) {
      console.log("Error inserting: %s", err);
    } else {
      req.flash('success', 'Новость успешно добавлен');
      res.redirect('/insurance/news');
    }
  });
});

router.get('/insurance/news/edit/:id', function(req, res, next) {
  var news_id = req.params.id;
  var query = "SELECT * FROM ic_news WHERE id = "+ news_id;
  console.log('Selecting news by ID query => ' + query);
  connection.query(query, function(err, rows) {
    if (err) {
      console.log('Error selecting : %s', err);
    } else {
      res.render('./news/edit', {
        data: rows,
        url: 'insurance/news/edit' + news_id,
        title: 'Редактирование новости',
        userId: req.user.id
      });
    }
  });
});

router.post('/insurance/news/save/:id', function(req, res, next) {
  var input = JSON.parse(JSON.stringify(req.body));
  var manager_id = req.user.id;
  var id = req.params.id;
  var currentTime = new Date().toLocaleTimeString();
  var currentDate = new Date().toLocaleDateString();
  var newsDate = currentTime + ' ' + currentDate;
  var data = {
      n_title                : input.n_title,
      n_body                 : input.n_body,
      n_date                 : newsDate,
      n_mgid                 : manager_id
  };
  console.log('Data appearance => ' + data);
  connection.query("UPDATE ic_news SET ? WHERE id = ? ",[data,id], function(err, rows)
  {
    if (err) {
        console.log("Error updating: %s ", err);
    } else {
        req.flash('success', 'Новость успешно изменен');
        res.redirect('/insurance/news');
    }
  });

});

router.get('/search', isLoggedIn, function (req, res, next) {
  res.render('search', {
    url: 'search',
    title: 'Поиск по базе',
    userId: req.user.id
  });
});

router.get('/find', isLoggedIn, function(req, res, next) {
  var keyword = req.query.keyword;
  console.log('Searching keyword => ' + keyword);
  var query = 'SELECT * FROM ic_clients WHERE client_fullname LIKE "%' + keyword + '%" OR client_address LIKE "%' + keyword + '%" OR client_city LIKE "%' + keyword + '%" OR client_phone LIKE "%' + keyword + '%" OR client_email LIKE "%' + keyword + '%"';
  connection.query(query, function(err, rows) {
    console.log("Searching query => " + query);
     if(err) {
      console.log("Error searching: %s", err);
     } else {
      console.log('Searched data => ' + rows);
      res.render('find', {
        url: 'search',
        title: 'Поиск по базе',
        data: rows,
        userId: req.user.id
      });
     }
  });
});

router.get('/profile', isLoggedIn, function (req, res, next) {

  var profile = 'SELECT * FROM ic_managers INNER JOIN ic_roles ON ic_managers.m_roleid = ic_roles.id WHERE ic_managers.id = "' + req.user.id +'" ';
  var activity = 'SELECT * FROM '

  connection.query(profile, function (err, rows) {
    // console.log(rows);
    if (err) {
      console.log("Error selecting : %s", err);
    } else {
      res.render('profile', {
        title: req.user.fullname,
        data: rows,
        url: 'profile',
        userId: req.user.id
    });
  }
 });
});

router.get('/insurance/kasko', isLoggedIn, function (req, res, next) {
 res.render('./kasko/kasko', {
    title: 'КАСКО',
    url: 'insurance/kasko',
    userId: req.user.id
  });
});

// Contact Form 

router.get('/insurance/forms/1', isLoggedIn, function (req, res, next) {

  var forms_request = 'SELECT i.id, i.f_name, i.f_email, i.f_phone, i.f_message, i.f_status, i.f_form_type, m.id as man_id, m.m_fullname, m.m_title FROM ic_form_requests i INNER JOIN ic_managers m ON i.f_served_mid = m.id WHERE f_form_type = "1" ';

  connection.query(forms_request, function (err, rows) {
    // console.log(rows);
    if (err) {
      console.log("Error selecting : %s", err);
    } else {
      res.render('./contact-form/contact-form', {
        title: 'Запросы с контактной формы',
        data: rows,
        url: 'insurance/forms/1',
        userId: req.user.id
    });
  }
 });
});

router.get('/insurance/forms/1/edit/:id', isLoggedIn, function(req, res, next) {

  var id = req.params.id;
  var forms_request = 'SELECT * FROM ic_form_requests WHERE id = ' + id + ' ';

  connection.query(forms_request, function(err, rows) {
    if (err) {
      console.log("Error selecting :%s", err);
    } else {
      res.render('./contact-form/edit', {
        title: 'Редактирование заявки',
        data: rows,
        url: 'insurance/forms/1/edit/' + id,
        userId: req.user.id
      })
    }
  });

});

router.post('/insurance/forms/1/update/:id', isLoggedIn, function(req, res, next) {

  var id = req.params.id;
  var input = JSON.parse(JSON.stringify(req.body));
  var manager_id = req.user.id;
  var currentTime = new Date().toLocaleTimeString();
  var currentDate = new Date().toLocaleDateString();
  var updatedDate = currentTime + ' ' + currentDate;
  var data = {
    f_name                 : input.f_name,
    f_email                : input.f_email,
    f_phone                : input.f_phone,
    f_message              : input.f_message,
    f_status               : input.f_status,
    f_form_type            : 1,
    f_served_mid           : manager_id,
    f_created_at           : input.created_at,
    f_updated_at           : updatedDate
  };

  connection.query("UPDATE ic_form_requests SET ? WHERE id = ? ",[data,id], function(err, rows){
    if (err) {
        console.log("Error updating: %s ", err);
    } else {
        req.flash('success', 'Данные успешно изменены');
        res.redirect('/insurance/forms/1');
    }
  });


});

router.get('/insurance/forms/1/delete/:id', isLoggedIn, function(req, res, next) {

  var id = req.params.id;
  var forms_request = 'DELETE FROM ic_form_requests WHERE id = ' + id + ' ';

  connection.query(forms_request, function(err, rows) {
    if (err) {
      console.log("Error deleting :%s", err);
    } else {
      req.flash('success', 'Запрос успешно удален');
      res.redirect('/insurance/forms/1');
    }
  });
});



// Insurance Case Form 

router.get('/insurance/forms/2', isLoggedIn, function (req, res, next) {

  var forms_request = 'SELECT i.id, i.f_name, i.f_email, i.f_phone, i.f_message, i.f_status, i.f_form_type, m.id as man_id, m.m_fullname, m.m_title FROM ic_form_requests i INNER JOIN ic_managers m ON i.f_served_mid = m.id WHERE f_form_type = "2" ';

  connection.query(forms_request, function (err, rows) {
    // console.log(rows);
    if (err) {
      console.log("Error selecting : %s", err);
    } else {
      res.render('./case-form/case-form', {
        title: 'Запросы с формы по страховым случаям',
        data: rows,
        url: 'insurance/forms/2',
        userId: req.user.id
    });
  }
 });
});

router.get('/insurance/forms/2/edit/:id', isLoggedIn, function(req, res, next) {

  var id = req.params.id;
  var forms_request = 'SELECT * FROM ic_form_requests WHERE id = ' + id + ' ';

  connection.query(forms_request, function(err, rows) {
    if (err) {
      console.log("Error selecting :%s", err);
    } else {
      res.render('./case-form/edit', {
        title: 'Редактирование заявки',
        data: rows,
        url: 'insurance/forms/2/edit/' + id,
        userId: req.user.id
      })
    }
  });

});

router.post('/insurance/forms/2/update/:id', isLoggedIn, function(req, res, next) {

  var id = req.params.id;
  var input = JSON.parse(JSON.stringify(req.body));
  var manager_id = req.user.id;
  var currentTime = new Date().toLocaleTimeString();
  var currentDate = new Date().toLocaleDateString();
  var updatedDate = currentTime + ' ' + currentDate;
  var data = {
    f_name                 : input.f_name,
    f_email                : input.f_email,
    f_phone                : input.f_phone,
    f_message              : input.f_message,
    f_status               : input.f_status,
    f_form_type            : 2,
    f_served_mid           : manager_id,
    f_created_at           : input.created_at,
    f_updated_at           : updatedDate
  };

  connection.query("UPDATE ic_form_requests SET ? WHERE id = ? ",[data,id], function(err, rows){
    if (err) {
        console.log("Error updating: %s ", err);
    } else {
        req.flash('success', 'Данные успешно изменены');
        res.redirect('/insurance/forms/2');
    }
  });


});

router.get('/insurance/forms/2/delete/:id', isLoggedIn, function(req, res, next) {

  var id = req.params.id;
  var forms_request = 'DELETE FROM ic_form_requests WHERE id = ' + id + ' ';

  connection.query(forms_request, function(err, rows) {
    if (err) {
      console.log("Error deleting :%s", err);
    } else {
      req.flash('success', 'Запрос успешно удален');
      res.redirect('/insurance/forms/2');
    }
  });
});


router.get('/staff', isLoggedIn, function(req, res, next) {

  var staff = 'SELECT * FROM ic_managers WHERE m_isadmin < 1 AND m_roleid < 4 ';
  // console.log('Admin => ' + req.user.m_isadmin);
  connection.query(staff, function(err, rows) {
    if (err) {
      console.log("Error selecting: %s", err);
    } else {

      res.render('./staff/staff', {
        title: 'Все менеджеры',
        data: rows,
        url: 'staff',
        userId: req.user.id
      });
    }
  });
});

router.get('/staff/find', isLoggedIn, function(req, res, next) {
  var keyword = req.query.keyword;
  console.log('Searching keyword => ' + keyword);
  var query = 'SELECT * FROM ic_managers WHERE m_fullname LIKE "%' + keyword + '%" OR m_title LIKE "%' + keyword + '%" OR m_phone LIKE "%' + keyword + '%" OR m_birthdate LIKE "%' + keyword + '%" OR m_email LIKE "%' + keyword + '%" OR m_gender LIKE "%' + keyword + '%" AND id != 1 AND id != 2 ';
  connection.query(query, function(err, rows) {
    console.log("Searching query => " + query);
     if(err) {
      console.log("Error searching: %s", err);
     } else {
      console.log('Searched data => ' + rows);
      res.render('./staff/find', {
        url: 'staff',
        title: 'Поиск по менеджерам',
        data: rows,
        userId: req.user.id
      });
     }
  });
});

router.get('/staff/show/:id', isLoggedIn, function(req, res, next) {
  var id = req.params.id;
  var staff = 'SELECT m.id, m.m_login, m.m_password, m.m_fullname, m.m_title, m.m_hiredate, m.m_phone, m.m_birthdate, m.m_gender, m.m_email, m.m_roleid, r.id as id_role , r.r_rolename FROM ic_managers m INNER JOIN ic_roles r ON m.m_roleid = r.id WHERE m.id = ' + id +' ';

  connection.query(staff, function(err, rows) {
    if (err) {
      console.log("Error selecting: %s", err);
    } else {
      console.log('Selecting query => ' + staff);
      res.render('./staff/show', {
        title: 'Информация о менеджере',
        data: rows,
        url: 'staff/show',
        userId: req.user.id
      });
    }
  });
});

router.get('/staff/edit/:id', isLoggedIn, function(req, res, next){
  var id = req.params.id;

  var staff = 'SELECT m.id, m.m_login, m.m_password, m.m_fullname, m.m_title, m.m_hiredate, m.m_phone, m.m_birthdate, m.m_gender, m.m_email, m.m_roleid, r.id as id_role , r.r_rolename FROM ic_managers m INNER JOIN ic_roles r ON m.m_roleid = r.id WHERE m.id = ' + id +' ';
  // var roles = 'SELECT * FROM ic_roles';

  connection.query(staff , function (err, rows) {
    if (err) {
      console.log("Error selecting: %s", err);
    } else {
      res.render('./staff/edit', {
        title: 'Редактирование менеджера',
        staff: rows,
        // roles: rows[1],
        url: 'staff/show',
        userId: req.user.id
      });
    }
  })
});

router.post('/staff/save/:id', isLoggedIn, function (req, res, next) {
  var input = JSON.parse(JSON.stringify(req.body));
  var id = req.params.id;
  var currentTime = new Date().toLocaleTimeString();
  var currentDate = new Date().toLocaleDateString();
  var staffUpdatedDate = currentTime + ' ' + currentDate;
  var data = {
      m_login                : input.m_login,
      m_password             : input.m_password,
      m_fullname             : input.m_fullname,
      m_title                : input.m_title,
      m_hiredate             : input.m_hiredate,
      m_phone                : input.m_phone,
      m_birthdate            : input.m_birthdate,
      m_gender               : input.m_gender,
      m_email                : input.m_email,
      m_isadmin              : 0,
      m_roleid               : 3,
      m_updated_at           : staffUpdatedDate
  };

  console.log('Data appearance => ' + data);
  connection.query("UPDATE ic_managers SET ? WHERE id = ? ",[data,id], function(err, rows)
  {
    if (err) {
        console.log("Error updating: %s ", err);
    } else {
        req.flash('success', 'Данные успешно изменены');
        res.redirect('/staff');
    }
  });
});

router.get('/staff/delete/:id', isLoggedIn, function (req, res, next) {
  var id = req.params.id;
  var query = 'DELETE FROM ic_managers WHERE id = ' + id + ' ';
  connection.query(query, function (err, rows) {
        if (err) {
            console.log("Error deleting: %s", err);
        } else {
            req.flash('primary', 'Менеджер успешно удален');
            res.redirect('/staff');
        }
    });
});

router.get('/staff/plus', isLoggedIn, function (req, res, next) {
  res.render('./staff/add', {
    url: 'staff/add',
    title: 'Добавить менеджера',
    userId: req.user.id
  });
});

router.post('/staff/add', isLoggedIn, function (req, res, next)  {
  var input = JSON.parse(JSON.stringify(req.body));
  var currentTime = new Date().toLocaleTimeString();
  var currentDate = new Date().toLocaleDateString();
  var staffCreatedDate = currentTime + ' ' + currentDate;
  var data = {
      m_login                : input.m_login,
      m_password             : input.m_password,
      m_fullname             : input.m_fullname,
      m_title                : input.m_title,
      m_hiredate             : input.m_hiredate,
      m_phone                : input.m_phone,
      m_birthdate            : input.m_birthdate,
      m_gender               : input.m_gender,
      m_email                : input.m_email,
      m_isadmin              : 0,
      m_roleid               : 3,
      m_created_at           : staffCreatedDate,
      m_updated_at           : staffCreatedDate
  };
  console.log('Data appearance => ' + data);
  connection.query("INSERT INTO ic_managers SET ? ", data, function (err, rows) {
    if (err) {
      console.log("Error inserting: %s", err);
    } else {
      req.flash('success', 'Менеджер успешно добавлен');
      res.redirect('/staff');
    }
  });
});

// Kasko

router.get('/insurance/kasko/add', isLoggedIn, function (req, res, next) {
  res.render('./kasko/add', {
    url: 'insurance/kasko/add',
    title: 'Добавить клиента по КАСКО',
    userId: req.user.id
  });
});

router.post('/insurance/kasko/iin/:val', function (req, res, next) {

    console.log(req.params.val);

    var url = 'https://webtest01.theeurasia.kz/insurance/policy/fetch-driver/';
    request({
      url: url,
      json: true
    }, function (error, response, body) {
      if (!error && response.statusCode === 200) {
          console.log(body.response);
          res.send(body.response);
      }
    })
});

router.post('/insurance/kasko/save', isLoggedIn, function (req, res, next) {
    var input = JSON.parse(JSON.stringify(req.body));
    var manager_id = req.user.id;
    var currentTime = new Date().toLocaleTimeString();
    var currentDate = new Date().toLocaleDateString();
    var kaskoCreatedDate = currentTime + ' ' + currentDate;
    var data = {
        car_type             : input.car_type,
        car_city             : input.car_city,
        car_year             : input.car_year,
        driver_experience    : input.driver_experience,
        driver_age           : input.driver_age,
        driver_iin           : input.driver_iin,
        client_city          : input.client_city,
        client_fullname      : input.client_fullname,
        client_phone         : input.client_phone,
        client_email         : input.client_email,
        car_number           : input.car_number,
        car_vin              : input.car_vin,
        client_address       : input.client_address,
        payment_type         : input.payment_type,
        ins_price            : input.ins_price,
        ins_type             : 1,
        served_mid           : manager_id,
        status               : 1,
        created_at           : kaskoCreatedDate,
        updated_at           : kaskoCreatedDate
    };
    var clientData = {
        client_fullname      : input.client_fullname,
        client_address       : input.client_address,
        client_city          : input.client_city,
        client_phone         : input.client_phone,
        client_email         : input.client_email,
        insurance_type       : 1,
        created_at           : kaskoCreatedDate,
        updated_at           : kaskoCreatedDate
    };
    console.log('Data appearance => ' + data);
    connection.query("INSERT INTO ic_clients SET ?", clientData, function(err, rows) {
        if (err) {
          console.log("Error inserting: %s", err);
        } else {
          console.log("Данные успешно добавлены в клиентскую базу");
        }
    });
    connection.query("INSERT INTO ic_kasko_order SET ? ", data, function (err, rows) {
        if (err) {
            console.log("Error inserting: %s", err);
        } else {
            req.flash('success', 'Клиент успешно добавлен');
            res.redirect('/insurance/kasko/clients');
        }
    });
});

router.get('/insurance/kasko/clients', isLoggedIn, function(req, res, next) {

  var kasko_new = 'SELECT  k.id, k.car_type, k.car_year, k.car_city, k.driver_experience, k.driver_age, k.driver_iin, k.client_city, k.client_fullname, k.client_phone, k.client_email, k.car_number, k.car_vin, k.client_address, k.payment_type, k.ins_price, k.ins_type, k.served_mid, k.status, m.id as manager_id, m.m_fullname, m.m_title FROM ic_kasko_order k INNER JOIN ic_managers m ON k.served_mid = m.id WHERE k.status = 0;';
  var kasko_in_process = 'SELECT  k.id, k.car_type, k.car_year, k.car_city, k.driver_experience, k.driver_age, k.driver_iin, k.client_city, k.client_fullname, k.client_phone, k.client_email, k.car_number, k.car_vin, k.client_address, k.payment_type, k.ins_price, k.ins_type, k.served_mid, k.status, m.id as manager_id, m.m_fullname, m.m_title FROM ic_kasko_order k INNER JOIN ic_managers m ON k.served_mid = m.id WHERE k.status = 1;';
  var kasko_finished = 'SELECT  k.id, k.car_type, k.car_year, k.car_city, k.driver_experience, k.driver_age, k.driver_iin, k.client_city, k.client_fullname, k.client_phone, k.client_email, k.car_number, k.car_vin, k.client_address, k.payment_type, k.ins_price, k.ins_type, k.served_mid, k.status, m.id as manager_id, m.m_fullname, m.m_title FROM ic_kasko_order k INNER JOIN ic_managers m ON k.served_mid = m.id WHERE k.status = 2;';
  connection.query(kasko_new + kasko_in_process + kasko_finished, function(err, rows) {
    if (err) {
      console.log('Error selecting : %s', err);
    } else {
      res.render('./kasko/clients', {
        title: 'Список клиентов по КАСКО',
        k_new: rows[0],
        k_in_process: rows[1],
        k_finished: rows[2],
        url: 'insurance/kasko/clients',
        userId: req.user.id
      });
    }
  });
});

router.get('/insurance/kasko/clients/find', isLoggedIn, function(req, res, next) {
  var keyword = req.query.keyword;
  console.log('Searching keyword => ' + keyword);
  var query = 'SELECT * FROM ic_kasko_order WHERE client_fullname LIKE "%' + keyword + '%" OR driver_iin LIKE "%' + keyword + '%" OR client_phone LIKE "%' + keyword + '%" OR client_address LIKE "%' + keyword + '%" OR client_email LIKE "%' + keyword + '%" OR car_number LIKE "%' + keyword + '%" OR client_city LIKE "%' + keyword + '%" ';
  connection.query(query, function(err, rows) {
    console.log("Searching query => " + query);
     if(err) {
      console.log("Error searching: %s", err);
     } else {
      console.log('Searched data => ' + rows);
      res.render('./kasko/find', {
        url: 'insurance/kasko/clients',
        title: 'Поиск клиентов по полису КАСКО',
        data: rows,
        userId: req.user.id
      });
     }
  });
});

router.get('/insurance/kasko/client/show/:id', isLoggedIn, function (req, res, next) {
  var id = req.params.id;
  var client = 'SELECT  k.id, k.car_type, k.car_year, k.car_city, k.driver_experience, k.driver_age, k.driver_iin, k.client_city, k.client_fullname, k.client_phone, k.client_email, k.car_number, k.car_vin, k.client_address, k.payment_type, k.ins_price, k.ins_type, k.served_mid, k.status, k.created_at, m.id as manager_id, m.m_fullname, m.m_title FROM ic_kasko_order k INNER JOIN ic_managers m ON k.served_mid = m.id WHERE k.id =  ' + id + ' ';
  connection.query(client, function (err, rows) {
    if (err) {
      console.log('Error selecting : %s', err);
    } else {
      res.render('./kasko/show', {
        title: 'Информация о клиенте ',
        data: rows,
        url: 'insurance/kasko/client/show' + id,
        userId: req.user.id
      });
    }
  });
});

router.get('/insurance/kasko/client/edit/:id', isLoggedIn, function(req, res, next) {
  var id = req.params.id;
  var client = 'SELECT  k.id, k.car_type, k.car_year, k.car_city, k.driver_experience, k.driver_age, k.driver_iin, k.client_city, k.client_fullname, k.client_phone, k.client_email, k.car_number, k.car_vin, k.client_address, k.payment_type, k.ins_price, k.ins_type, k.served_mid, k.status, k.created_at, m.id as manager_id, m.m_fullname, m.m_title FROM ic_kasko_order k INNER JOIN ic_managers m ON k.served_mid = m.id WHERE k.id =  ' + id + ' ';
  connection.query(client, function(err, rows) {
    if (err) {
      console.log('Error selecting : %s', err);
    } else {
      res.render('./kasko/edit', {
        title: 'Редактирование клиента',
        data: rows,
        url: 'insurance/kasko/client/edit/' + id,
        userId: req.user.id
      });
    }
  });
});

router.post('/insurance/kasko/client/update/:id', isLoggedIn, function(req, res, next) {
  var id = req.params.id;
  var input = JSON.parse(JSON.stringify(req.body));
  var manager_id = req.user.id;
  var currentTime = new Date().toLocaleTimeString();
  var currentDate = new Date().toLocaleDateString();
  var updatedDate = currentTime + ' ' + currentDate;
  var data = {
    car_type             : input.car_type,
    car_city             : input.car_city,
    car_year             : input.car_year,
    driver_experience    : input.driver_experience,
    driver_age           : input.driver_age,
    driver_iin           : input.driver_iin,
    client_city          : input.client_city,
    client_fullname      : input.client_fullname,
    client_phone         : input.client_phone,
    client_email         : input.client_email,
    car_number           : input.car_number,
    car_vin              : input.car_vin,
    client_address       : input.client_address,
    payment_type         : input.payment_type,
    ins_price            : input.ins_price,
    ins_type             : 1,
    served_mid           : manager_id,
    status               : input.status,
    created_at           : input.created_at,
    updated_at           : updatedDate
  };
  var clientData = {
      client_fullname      : input.client_fullname,
      client_address       : input.client_address,
      client_city          : input.client_city,
      client_phone         : input.client_phone,
      client_email         : input.client_email,
      insurance_type       : 1,
      created_at           : input.created_at,
      updated_at           : updatedDate
  };
  console.log('Data appearance => ' + data);
  connection.query("UPDATE ic_clients SET ? WHERE id = ?", [clientData, id], function(err, rows) {
    if (err) {
      console.log("Error inserting: %s", err);
    } else {
      console.log("Данные успешно изменены и внесены в клиентскую базу");
    }
  });
  connection.query("UPDATE ic_kasko_order SET ? WHERE id = ? ",[data,id], function(err, rows)
  {
    if (err) {
        console.log("Error updating: %s ", err);
    } else {
        req.flash('success', 'Данные успешно изменены');
        res.redirect('/insurance/kasko/clients');
    }
  });
});

router.get('/insurance/kasko/client/delete/:id', isLoggedIn, function(req, res, next) {
  var id = req.params.id;
  var client = 'DELETE FROM ic_kasko_order WHERE id = ' + id + ' ';
  connection.query(client, function(err, rows) {
    if (err) {
      console.log('Error deleting : %s', err);
    } else {
      req.flash('success', 'Менеджер успешно удален');
      res.redirect('/insurance/kasko/clients');
    }
  });
});

// Clients


router.get('/clients', isLoggedIn, function (req, res, next) {
  if (req.user.m_isadmin != 1) {
    res.redirect('/home');
  } else {
    var query = "SELECT * FROM ic_clients";
    connection.query(query, function(err, rows) {
      if (err) {
        console.log('Error selecting: %s', err);
      } else {
        res.render('./clients/index', {
          url: 'clients',
          title: 'Клиентская база',
          data: rows,
          userId: req.user.id
        });
      }
    });
  }
});

router.get('/clients/find', isLoggedIn, function(req, res, next) {
  if (req.user.m_isadmin != 1) {
    res.redirect('/home');
  } else {
      var query = 'SELECT * FROM ic_clients WHERE client_fullname LIKE "%' + keyword + '%" OR client_address LIKE "%' + keyword + '%" OR client_city LIKE "%' + keyword + '%" OR client_phone LIKE "%' + keyword + '%" OR client_email LIKE "%' + keyword + '%"';
      connection.query(query, function(err, rows) {
        res.render('./clients/find', {
          url: 'clients/find',
          title: 'Поиск по клиентской базе',
          data: rows,
          userId: req.user.id
        });
      });
    }
});

router.get('/statistics', isLoggedIn, function (req, res, next) {
  if (req.user.m_isadmin != 1) {
    res.redirect('/home');
  } else {

    res.render('statistics', {
      url: 'statistics',
      title: 'Вся статистика',
      userId: req.user.id
    });
  }
});

// Announcements

router.get('/announcements', isLoggedIn, function(req, res, next) {
  if (req.user.m_isadmin != 1) {
    res.redirect('/home');
  } else {
    var query = "SELECT * FROM ic_announcements";
    connection.query(query, function(err, rows) {
      if (err) {
        console.log('Error selecting : %s' ,err);
      } else {
        res.render('./announcements/announcements', {
          url: 'announcements',
          title: 'Анонсы компании',
          data: rows,
          userId: req.user.id
        });
      }
    });
  }
});

router.get('/announcement/delete/:id', isLoggedIn, function(req, res, next) {
  if (req.user.m_isadmin != 1) {
    res.redirect('/home');
  } else {
    var id = req.params.id;
    var query = "DELETE FROM ic_announcements WHERE id = ' + id + ' ";
    connection.query(query, function(err, rows) {
      if (err) {
        console.log('Error deleting: %s', err);
      } else {
        req.flash('success', 'Анонс успешно удален');
        res.redirect('/announcements');
      }
    });
  }
});

router.get('/announcement/add', isLoggedIn, function(req, res, next) {
  if (req.user.m_isadmin != 1) {
    res.redirect('/home');
  } else {
    res.render('./announcements/add', {
      url: 'announcement/add',
      title: 'Добавление анонса',
      userId: req.user.id
    });
  }
});

router.post('/announcement/add', isLoggedIn, function(req, res, next) {
  if (req.user.m_isadmin != 1) {
    res.redirect('/home');
  } else {
    var input = JSON.parse(JSON.stringify(req.body));
    var manager_id = req.user.id;
    var currentTime = new Date().toLocaleTimeString();
    var currentDate = new Date().toLocaleDateString();
    var announcementDate = currentTime + ' ' + currentDate;

    var data = {
        title                : input.title,
        body                 : input.body,
        tag                  : input.tag,
        manager_id           : manager_id,
        created_at           : announcementDate,
        updated_at           : announcementDate
    };
      console.log('Data appearance => ' + data);
      connection.query("INSERT INTO ic_announcements SET ? ", data, function (err, rows) {
          if (err) {
              console.log("Error inserting: %s", err);
          } else {
              req.flash('success', 'Анонс успешно добавлен');
              res.redirect('/announcements');
          }
      });
  }
});

router.get('/announcement/edit/:id', isLoggedIn, function(req, res, next) {
  if (req.user.m_isadmin != 1) {
    res.redirect('/home');
  } else {
    var id = req.params.id;
    var query = 'SELECT  * FROM ic_announcements WHERE id =  ' + id + ' ';
    connection.query(query, function(err, rows) {
      if (err) {
        console.log('Error selecting : %s', err);
      } else {
        res.render('./announcements/edit', {
          title: 'Редактирование анонса',
          data: rows,
          url: 'announcement/edit/' + id,
          userId: req.user.id
        });
      }
    });
  }
});

router.post('/announcement/save/:id', isLoggedIn, function(req, res, next) {
  if (req.user.m_isadmin != 1) {
    res.redirect('/home');
  } else { 
    var id = req.params.id;
    var currentTime = new Date().toLocaleTimeString();
    var currentDate = new Date().toLocaleDateString();
    var announcementDate = currentTime + ' ' + currentDate;
    var manager_id = req.user.id;
    var input = JSON.parse(JSON.stringify(req.body));
    var data = {
      title                : input.title,
      body                 : input.body,
      tag                  : input.tag,
      manager_id           : manager_id,
      created_at           : announcementDate,
      updated_at           : announcementDate
    };
    console.log('Data apppearance  => ' + data);
    connection.query("UPDATE ic_announcements SET ? WHERE id = ? ",[data,id], function(err, rows)
    {
      if (err) {
          console.log("Error updating: %s ", err);
      } else {
          req.flash('success', 'Данные успешно изменены');
          res.redirect('/announcements');
      }
    });
  }
});

// Tourism

router.get('/insurance/tourism', isLoggedIn, function (req, res, next) {
 res.render('./tourism/tourism', {
    title: 'Туризм',
    url: 'insurance/tourism',
    userId: req.user.id
  });
});

router.get('/insurance/tourism/add', isLoggedIn, function (req, res, next) {
  res.render('./tourism/add', {
    url: 'insurance/tourism/add',
    title: 'Добавить клиента по полису - Туризм',
    userId: req.user.id
  });
});

router.get('/insurance/tourism/clients', isLoggedIn, function(req, res, next) {

  var tourism_new = 'SELECT  k.id, k.insurance_sum, k.currency, k.currency_sum, k.start_date, k.end_date, k.client_city, k.client_fullname, k.client_phone, k.client_email, k.client_address, k.payment_type, k.insurance_price, k.insurance_type, k.served_mid, k.status, m.id as manager_id, m.m_fullname, m.m_title FROM ic_tourism_order k INNER JOIN ic_managers m ON k.served_mid = m.id WHERE k.status = 0 ORDER BY created_at desc;' ;
  var tourism_in_process = 'SELECT  k.id, k.insurance_sum, k.currency, k.currency_sum, k.start_date, k.end_date, k.client_city, k.client_fullname, k.client_phone, k.client_email, k.client_address, k.payment_type, k.insurance_price, k.insurance_type, k.served_mid, k.status, m.id as manager_id, m.m_fullname, m.m_title FROM ic_tourism_order k INNER JOIN ic_managers m ON k.served_mid = m.id WHERE k.status = 1 ORDER BY created_at desc;' ;
  var tourism_finished = 'SELECT  k.id, k.insurance_sum, k.currency, k.currency_sum, k.start_date, k.end_date, k.client_city, k.client_fullname, k.client_phone, k.client_email, k.client_address, k.payment_type, k.insurance_price, k.insurance_type, k.served_mid, k.status, m.id as manager_id, m.m_fullname, m.m_title FROM ic_tourism_order k INNER JOIN ic_managers m ON k.served_mid = m.id WHERE k.status = 2 ORDER BY created_at desc;' ;
  connection.query(tourism_new+tourism_in_process+tourism_finished, function(err, rows) {
    // console.log(tourism_new);
    // console.log(tourism_in_process);
    // console.log(tourism_finished);
    if (err) {
      console.log('Error selecting : %s', err);
    } else {
      res.render('./tourism/clients', {
        title: 'Список клиентов по полису - Туризм',
        t_new: rows[0],
        t_in_process: rows[1],
        t_finished: rows[2],
        url: 'insurance/tourism/clients',
        userId: req.user.id
      });
    }
  });
});

router.get('/insurance/tourism/clients/find', isLoggedIn, function(req, res, next) {
  var keyword = req.query.keyword;
  console.log('Searching keyword => ' + keyword);
  var query = 'SELECT * FROM ic_tourism_order WHERE client_fullname LIKE "%' + keyword + '%" OR client_phone LIKE "%' + keyword + '%" OR client_address LIKE "%' + keyword + '%" OR client_email LIKE "%' + keyword + '%" OR client_city LIKE "%' + keyword + '%" ';
  connection.query(query, function(err, rows) {
    console.log("Searching query => " + query);
     if(err) {
      console.log("Error searching: %s", err);
     } else {
      console.log('Searched data => ' + rows);
      res.render('./tourism/find', {
        url: 'insurance/tourism/clients',
        title: 'Поиск клиентов по полису - Туризм',
        data: rows,
        userId: req.user.id
      });
     }
  });
});


router.post('/insurance/tourism/save', isLoggedIn, function (req, res, next) {
    var input = JSON.parse(JSON.stringify(req.body));
    var manager_id = req.user.id;
    var currentTime = new Date().toLocaleTimeString();
    var currentDate = new Date().toLocaleDateString();
    var createdDate = currentTime + ' ' + currentDate;
    var data = {
          insurance_sum        : input.sc1,
          currency             : input.sc2,
          currency_sum         : input.curs,
          start_date           : input.sc3,
          end_date             : input.sc4,
          days                 : input.kold,
          client_city          : input.client_city,
          client_fullname      : input.client_fullname,
          client_phone         : input.client_phone,
          client_email         : input.client_email,
          client_iin           : input.client_iin,
          client_address       : input.client_address,
          payment_type         : input.payment_type,
          insurance_price      : input.ins_price,
          insurance_type       : 2,
          served_mid           : manager_id,
          status               : 1,
          created_at           : createdDate,
          updated_at           : createdDate
      };
    var clientData = {
          client_fullname      : input.client_fullname,
          client_address       : input.client_address,
          client_city          : input.client_city,
          client_phone         : input.client_phone,
          client_email         : input.client_email,
          insurance_type       : 2,
          created_at           : createdDate,
          updated_at           : createdDate
    };
    console.log('Data appearance => ' + data);
    connection.query("INSERT INTO ic_clients SET ?", clientData, function(err, rows) {
        if (err) {
          console.log("Error inserting: %s", err);
        } else {
          console.log("Данные успешно добавлены в клиентскую базу");
        }
    });
    connection.query("INSERT INTO ic_tourism_order SET ? ", data, function (err, rows) {
        if (err) {
            console.log("Error inserting: %s", err);
        } else {
            req.flash('success', 'Клиент успешно добавлен');
            res.redirect('/insurance/tourism/clients');
        }
    });
});



router.get('/insurance/tourism/client/show/:id', isLoggedIn, function (req, res, next) {
  var id = req.params.id;
  var client = 'SELECT  k.id, k.insurance_sum, k.currency, k.currency_sum, k.start_date, k.end_date, k.days, k.client_city, k.client_fullname, k.client_phone, k.client_email, k.client_iin, k.client_address, k.payment_type, k.insurance_price, k.insurance_type, k.served_mid, k.status, k.created_at, k.updated_at, m.id as manager_id, m.m_fullname, m.m_title FROM ic_tourism_order k INNER JOIN ic_managers m ON k.served_mid = m.id WHERE k.id =  ' + id + ' ';
  connection.query(client, function (err, rows) {
    if (err) {
      console.log('Error selecting : %s', err);
    } else {
      res.render('./tourism/show', {
        title: 'Информация о клиенте ',
        data: rows,
        url: 'insurance/tourism/client/show' + id,
        userId: req.user.id
      });
    }
  });
});


router.get('/insurance/tourism/client/edit/:id', isLoggedIn, function (req, res, next) {
  var id = req.params.id;
  var client = 'SELECT  k.id, k.insurance_sum, k.currency, k.currency_sum, k.start_date, k.end_date, k.days, k.client_city, k.client_fullname, k.client_phone, k.client_email, k.client_iin, k.client_address, k.payment_type, k.insurance_price, k.insurance_type, k.served_mid, k.status, k.created_at, k.updated_at, m.id as manager_id, m.m_fullname, m.m_title FROM ic_tourism_order k INNER JOIN ic_managers m ON k.served_mid = m.id WHERE k.id =  ' + id + ' ';
  connection.query(client, function (err, rows) {
    if (err) {
      console.log('Error selecting : %s', err);
    } else {
      res.render('./tourism/edit', {
        title: 'Редактирование клиента ',
        data: rows,
        url: 'insurance/tourism/client/show' + id,
        userId: req.user.id
      });
    }
  });
});


router.post('/insurance/tourism/client/update/:id', isLoggedIn, function (req, res, next) {
    var id = req.params.id;
    var input = JSON.parse(JSON.stringify(req.body));
    var manager_id = req.user.id;
    var currentTime = new Date().toLocaleTimeString();
    var currentDate = new Date().toLocaleDateString();
    var updatedDate = currentTime + ' ' + currentDate;
    var data = {
          insurance_sum        : input.sc1,
          currency             : input.sc2,
          currency_sum         : input.curs,
          start_date           : input.sc3,
          end_date             : input.sc4,
          days                 : input.kold,
          client_city          : input.client_city,
          client_fullname      : input.client_fullname,
          client_phone         : input.client_phone,
          client_email         : input.client_email,
          client_iin           : input.client_iin,
          client_address       : input.client_address,
          payment_type         : input.payment_type,
          insurance_price      : input.ins_price,
          insurance_type       : 2,
          served_mid           : manager_id,
          status               : input.status,
          created_at           : input.created_at,
          updated_at           : updatedDate
      };
    var clientData = {
          client_fullname      : input.client_fullname,
          client_address       : input.client_address,
          client_city          : input.client_city,
          client_phone         : input.client_phone,
          client_email         : input.client_email,
          insurance_type       : 2,
          created_at           : input.created_at,
          updated_at           : updatedDate
    };
    console.log('Data appearance => ' + data);
    connection.query("UPDATE ic_clients SET ? WHERE id = ?", [clientData, id], function(err, rows) {
        if (err) {
          console.log("Error inserting: %s", err);
        } else {
          console.log("Данные успешно изменены и внесены в клиентскую базу");
        }
    });
    connection.query("UPDATE ic_tourism_order SET ? WHERE id = ?", [data, id], function (err, rows) {
        if (err) {
            console.log("Error inserting: %s", err);
        } else {
            req.flash('success', 'Клиент успешно редактирован');
            res.redirect('/insurance/tourism/clients');
        }
    });
});

router.get('/insurance/tourism/client/delete/:id', isLoggedIn, function(req, res, next) {
  var id = req.params.id;
  var client = 'DELETE FROM ic_tourism_order WHERE id = ' + id + ' ';
  connection.query(client, function(err, rows) {
    if (err) {
      console.log('Error deleting : %s', err);
    } else {
      req.flash('success', 'Заявка успешна удалена');
      res.redirect('/insurance/tourism/clients');
    }
  });
});



// Gooods

router.get('/insurance/goods', isLoggedIn, function (req, res, next) {
 res.render('./goods/goods', {
    title: 'Недвижимость',
    url: 'insurance/goods',
    userId: req.user.id
  });
});

router.get('/insurance/goods/add', isLoggedIn, function (req, res, next) {
  res.render('./goods/add', {
    url: 'insurance/goods/add',
    title: 'Добавить клиента по полису - Недвижимость',
    userId: req.user.id
  });
});

router.get('/insurance/goods/clients', isLoggedIn, function(req, res, next) {

  var goods_new = 'SELECT  k.id, k.goods_type, k.risk_type, k.given_sum, k.client_city, k.client_fullname, k.client_phone, k.client_email, k.client_address, k.payment_type, k.insurance_price, k.insurance_type, k.served_mid, k.status, m.id as manager_id, m.m_fullname, m.m_title FROM ic_goods_order k INNER JOIN ic_managers m ON k.served_mid = m.id WHERE k.status = 0 ORDER BY created_at desc;' ;
  var goods_in_process = 'SELECT  k.id, k.goods_type, k.risk_type, k.given_sum, k.client_city, k.client_fullname, k.client_phone, k.client_email, k.client_address, k.payment_type, k.insurance_price, k.insurance_type, k.served_mid, k.status, m.id as manager_id, m.m_fullname, m.m_title FROM ic_goods_order k INNER JOIN ic_managers m ON k.served_mid = m.id WHERE k.status = 1 ORDER BY created_at desc;' ;
  var goods_finished = 'SELECT  k.id, k.goods_type, k.risk_type, k.given_sum, k.client_city, k.client_fullname, k.client_phone, k.client_email, k.client_address, k.payment_type, k.insurance_price, k.insurance_type, k.served_mid, k.status, m.id as manager_id, m.m_fullname, m.m_title FROM ic_goods_order k INNER JOIN ic_managers m ON k.served_mid = m.id WHERE k.status = 2 ORDER BY created_at desc;' ;
  connection.query(goods_new + goods_in_process + goods_finished, function(err, rows) {
    if (err) {
      console.log('Error selecting : %s', err);
    } else {
      res.render('./goods/clients', {
        title: 'Список клиентов по полису - Недвижимость',
        g_new: rows[0],
        g_in_process: rows[1],
        g_finished: rows[2],
        url: 'insurance/goods/clients',
        userId: req.user.id
      });
    }
  });
});

router.get('/insurance/goods/clients/find', isLoggedIn, function(req, res, next) {
  var keyword = req.query.keyword;
  console.log('Searching keyword => ' + keyword);
  var query = 'SELECT * FROM ic_goods_order WHERE client_fullname LIKE "%' + keyword + '%" OR client_phone LIKE "%' + keyword + '%" OR client_address LIKE "%' + keyword + '%" OR client_email LIKE "%' + keyword + '%" OR client_city LIKE "%' + keyword + '%" ';
  connection.query(query, function(err, rows) {
    console.log("Searching query => " + query);
     if(err) {
      console.log("Error searching: %s", err);
     } else {
      console.log('Searched data => ' + rows);
      res.render('./goods/find', {
        url: 'insurance/goods/clients',
        title: 'Поиск клиентов по полису - Недвижимость',
        data: rows,
        userId: req.user.id
      });
     }
  });
});


router.post('/insurance/goods/save', isLoggedIn, function (req, res, next) {
    var input = JSON.parse(JSON.stringify(req.body));
    var manager_id = req.user.id;
    var currentTime = new Date().toLocaleTimeString();
    var currentDate = new Date().toLocaleDateString();
    var createdDate = currentTime + ' ' + currentDate;
    var risks = [
      input.r1,
      input.r2,
      input.r3,
      input.r4,
      input.r5
    ];

    var array = risks.join();

    var data = {
        goods_type           : input.sc1,
        risk_type            : array,
        given_sum            : input.sc3,
        client_city          : input.client_city,
        client_fullname      : input.client_fullname,
        client_phone         : input.client_phone,
        client_email         : input.client_email,
        client_address       : input.client_address,
        payment_type         : input.payment_type,
        insurance_price      : input.ins_price,
        insurance_type       : 4,
        served_mid           : manager_id,
        status               : 1,
        created_at           : createdDate,
        updated_at           : createdDate
    };
    var clientData = {
        client_fullname      : input.client_fullname,
        client_address       : input.client_address,
        client_city          : input.client_city,
        client_phone         : input.client_phone,
        client_email         : input.client_email,
        insurance_type       : 4,
        created_at           : createdDate,
        updated_at           : createdDate
    };
    console.log(data);
    connection.query("INSERT INTO ic_clients SET ?", clientData, function(err, rows) {
        if (err) {
          console.log("Error inserting: %s", err);
        } else {
          console.log("Данные успешно добавлены в клиентскую базу");
        }
    });
    connection.query("INSERT INTO ic_goods_order SET ? ", data, function (err, rows) {
        if (err) {
            console.log("Error inserting: %s", err);
        } else {
            req.flash('success', 'Клиент успешно добавлен');
            res.redirect('/insurance/goods/clients');
        }
    });
});



router.get('/insurance/goods/client/show/:id', isLoggedIn, function (req, res, next) {
  var id = req.params.id;
  var client = 'SELECT  k.id, k.goods_type, k.risk_type, k.given_sum, k.client_city, k.client_fullname, k.client_phone, k.client_email, k.client_address, k.payment_type, k.insurance_price, k.insurance_type, k.served_mid, k.status, k.created_at, k.updated_at, m.id as manager_id, m.m_fullname, m.m_title FROM ic_goods_order k INNER JOIN ic_managers m ON k.served_mid = m.id WHERE k.id =  ' + id + ' ';
  connection.query(client, function (err, rows) {
    if (err) {
      console.log('Error selecting : %s', err);
    } else {
      res.render('./goods/show', {
        title: 'Информация о клиенте ',
        data: rows,
        url: 'insurance/goods/client/show' + id,
        userId: req.user.id
      });
    }
  });
});


router.get('/insurance/goods/client/edit/:id', isLoggedIn, function (req, res, next) {
  var id = req.params.id;
  var client = 'SELECT  k.id, k.goods_type, k.risk_type, k.given_sum, k.client_city, k.client_fullname, k.client_phone, k.client_email, k.client_address, k.payment_type, k.insurance_price, k.insurance_type, k.served_mid, k.status, k.created_at, k.updated_at, m.id as manager_id, m.m_fullname, m.m_title FROM ic_goods_order k INNER JOIN ic_managers m ON k.served_mid = m.id WHERE k.id =  ' + id + ' ';
  connection.query(client, function (err, rows) {
    if (err) {
      console.log('Error selecting : %s', err);
    } else {
      res.render('./goods/edit', {
        title: 'Редактирование клиента ',
        data: rows,
        url: 'insurance/goods/client/show' + id,
        userId: req.user.id
      });
    }
  });
});


router.post('/insurance/goods/client/update/:id', isLoggedIn, function (req, res, next) {
    var id = req.params.id;
    var input = JSON.parse(JSON.stringify(req.body));
    var manager_id = req.user.id;
    var currentTime = new Date().toLocaleTimeString();
    var currentDate = new Date().toLocaleDateString();
    var updatedDate = currentTime + ' ' + currentDate;
    var risks = [
      input.r1,
      input.r2,
      input.r3,
      input.r4,
      input.r5
    ];

    var array = risks.join();

    var data = {
        goods_type           : input.sc1,
        risk_type            : array,
        given_sum            : input.sc3,
        client_city          : input.client_city,
        client_fullname      : input.client_fullname,
        client_phone         : input.client_phone,
        client_email         : input.client_email,
        client_address       : input.client_address,
        payment_type         : input.payment_type,
        insurance_price      : input.ins_price,
        insurance_type       : 4,
        served_mid           : manager_id,
        status               : input.status,
        created_at           : input.created_at,
        updated_at           : updatedDate
      };
    var clientData = {
          client_fullname      : input.client_fullname,
          client_address       : input.client_address,
          client_city          : input.client_city,
          client_phone         : input.client_phone,
          client_email         : input.client_email,
          insurance_type       : 2,
          created_at           : input.created_at,
          updated_at           : updatedDate
    };
    console.log('Data appearance => ' + data);
    connection.query("UPDATE ic_clients SET ? WHERE id = ?", [clientData, id], function(err, rows) {
        if (err) {
          console.log("Error inserting: %s", err);
        } else {
          console.log("Данные успешно изменены и внесены в клиентскую базу");
        }
    });
    connection.query("UPDATE ic_goods_order SET ? WHERE id = ?", [data, id], function (err, rows) {
        if (err) {
            console.log("Error inserting: %s", err);
        } else {
            req.flash('success', 'Клиент успешно редактирован');
            res.redirect('/insurance/goods/clients');
        }
    });
});

router.get('/insurance/goods/client/delete/:id', isLoggedIn, function(req, res, next) {
  var id = req.params.id;
  var client = 'DELETE FROM ic_goods_order WHERE id = ' + id + ' ';
  connection.query(client, function(err, rows) {
    if (err) {
      console.log('Error deleting : %s', err);
    } else {
      req.flash('success', 'Заявка успешна удалена');
      res.redirect('/insurance/goods/clients');
    }
  });
});



// Accident




router.get('/insurance/accident', isLoggedIn, function (req, res, next) {
 res.render('./accident/accident', {
    title: 'Несчастный случай',
    url: 'insurance/accident',
    userId: req.user.id
  });
});

router.get('/insurance/accident/add', isLoggedIn, function (req, res, next) {
  res.render('./accident/add', {
    url: 'insurance/accident/add',
    title: 'Добавить клиента по полису - Несчастный случай',
    userId: req.user.id
  });
});

router.get('/insurance/accident/clients', isLoggedIn, function(req, res, next) {

  var accident_new = 'SELECT  k.id, k.insurance_money, k.insurance_territory, k.insurance_term, k.client_city, k.client_fullname, k.client_phone, k.client_email, k.client_address, k.payment_type, k.insurance_price, k.insurance_type, k.served_mid, k.status, m.id as manager_id, m.m_fullname, m.m_title FROM ic_accident_order k INNER JOIN ic_managers m ON k.served_mid = m.id WHERE k.status = 0 ORDER BY created_at desc;' ;
  var accident_in_process = 'SELECT  k.id, k.insurance_money, k.insurance_territory, k.insurance_term, k.client_city, k.client_fullname, k.client_phone, k.client_email, k.client_address, k.payment_type, k.insurance_price, k.insurance_type, k.served_mid, k.status, m.id as manager_id, m.m_fullname, m.m_title FROM ic_accident_order k INNER JOIN ic_managers m ON k.served_mid = m.id WHERE k.status = 1 ORDER BY created_at desc;' ;
  var accident_finished = 'SELECT  k.id, k.insurance_money, k.insurance_territory, k.insurance_term, k.client_city, k.client_fullname, k.client_phone, k.client_email, k.client_address, k.payment_type, k.insurance_price, k.insurance_type, k.served_mid, k.status, m.id as manager_id, m.m_fullname, m.m_title FROM ic_accident_order k INNER JOIN ic_managers m ON k.served_mid = m.id WHERE k.status = 2 ORDER BY created_at desc;' ;
  connection.query(accident_new + accident_in_process + accident_finished, function(err, rows) {
    if (err) {
      console.log('Error selecting : %s', err);
    } else {
      res.render('./accident/clients', {
        title: 'Список клиентов по полису - Несчастный случай',
        a_new: rows[0],
        a_in_process: rows[1],
        a_finished: rows[2],
        url: 'insurance/accident/clients',
        userId: req.user.id
      });
    }
  });
});

router.get('/insurance/accident/clients/find', isLoggedIn, function(req, res, next) {
  var keyword = req.query.keyword;
  console.log('Searching keyword => ' + keyword);
  var query = 'SELECT * FROM ic_accident_order WHERE client_fullname LIKE "%' + keyword + '%" OR client_phone LIKE "%' + keyword + '%" OR client_address LIKE "%' + keyword + '%" OR client_email LIKE "%' + keyword + '%" OR client_city LIKE "%' + keyword + '%" ';
  connection.query(query, function(err, rows) {
    console.log("Searching query => " + query);
     if(err) {
      console.log("Error searching: %s", err);
     } else {
      console.log('Searched data => ' + rows);
      res.render('./accident/find', {
        url: 'insurance/accident/clients',
        title: 'Поиск клиентов по полису - Несчастный случай',
        data: rows,
        userId: req.user.id
      });
     }
  });
});


router.post('/insurance/accident/save', isLoggedIn, function (req, res, next) {
    var input = JSON.parse(JSON.stringify(req.body));
    var manager_id = req.user.id;
    var currentTime = new Date().toLocaleTimeString();
    var currentDate = new Date().toLocaleDateString();
    var createdDate = currentTime + ' ' + currentDate;
    var data = {
        insurance_money      : input.sc1,
        insurance_territory  : input.sc2,
        insurance_term       : input.sc3,
        client_city          : input.client_city,
        client_fullname      : input.client_fullname,
        client_phone         : input.client_phone,
        client_email         : input.client_email,
        client_address       : input.client_address,
        client_iin           : input.client_iin,
        payment_type         : input.payment_type,
        insurance_price      : input.ins_price,
        insurance_type       : 5,
        served_mid           : manager_id,
        status               : 1,
        created_at           : createdDate,
        updated_at           : createdDate
    };
    var clientData = {
        client_fullname      : input.client_fullname,
        client_address       : input.client_address,
        client_city          : input.client_city,
        client_phone         : input.client_phone,
        client_email         : input.client_email,
        insurance_type       : 5,
        created_at           : createdDate,
        updated_at           : createdDate
    };
    console.log(data);
    connection.query("INSERT INTO ic_clients SET ?", clientData, function(err, rows) {
        if (err) {
          console.log("Error inserting: %s", err);
        } else {
          console.log("Данные успешно добавлены в клиентскую базу");
        }
    });
    connection.query("INSERT INTO ic_accident_order SET ? ", data, function (err, rows) {
        if (err) {
            console.log("Error inserting: %s", err);
        } else {
            req.flash('success', 'Клиент успешно добавлен');
            res.redirect('/insurance/accident/clients');
        }
    });
});



router.get('/insurance/accident/client/show/:id', isLoggedIn, function (req, res, next) {
  var id = req.params.id;
  var client = 'SELECT  k.id, k.insurance_money, k.insurance_territory, k.insurance_term, k.client_city, k.client_fullname, k.client_phone, k.client_email, k.client_address, k.payment_type, k.insurance_price, k.insurance_type, k.served_mid, k.status, k.created_at, k.updated_at, m.id as manager_id, m.m_fullname, m.m_title FROM ic_goods_order k INNER JOIN ic_managers m ON k.served_mid = m.id WHERE k.id =  ' + id + ' ';
  connection.query(client, function (err, rows) {
    if (err) {
      console.log('Error selecting : %s', err);
    } else {
      res.render('./accident/show', {
        title: 'Информация о клиенте ',
        data: rows,
        url: 'insurance/accident/client/show' + id,
        userId: req.user.id
      });
    }
  });
});


router.get('/insurance/accident/client/edit/:id', isLoggedIn, function (req, res, next) {
  var id = req.params.id;
  var client = 'SELECT  k.id, k.insurance_money, k.insurance_territory, k.insurance_term, k.client_city, k.client_fullname, k.client_phone, k.client_email, k.client_address, k.client_iin, k.payment_type, k.insurance_price, k.insurance_type, k.served_mid, k.status, k.created_at, k.updated_at, m.id as manager_id, m.m_fullname, m.m_title FROM ic_accident_order k INNER JOIN ic_managers m ON k.served_mid = m.id WHERE k.id =  ' + id + ' ';
  connection.query(client, function (err, rows) {
    if (err) {
      console.log('Error selecting : %s', err);
    } else {
      res.render('./accident/edit', {
        title: 'Редактирование клиента ',
        data: rows,
        url: 'insurance/accident/client/show' + id,
        userId: req.user.id
      });
    }
  });
});


router.post('/insurance/accident/client/update/:id', isLoggedIn, function (req, res, next) {
    var id = req.params.id;
    var input = JSON.parse(JSON.stringify(req.body));
    var manager_id = req.user.id;
    var currentTime = new Date().toLocaleTimeString();
    var currentDate = new Date().toLocaleDateString();
    var updatedDate = currentTime + ' ' + currentDate;
    var data = {
        insurance_money      : input.sc1,
        insurance_territory  : input.sc2,
        insurance_term       : input.sc3,
        client_city          : input.client_city,
        client_fullname      : input.client_fullname,
        client_phone         : input.client_phone,
        client_email         : input.client_email,
        client_address       : input.client_address,
        client_iin           : input.client_iin,
        payment_type         : input.payment_type,
        insurance_price      : input.ins_price,
        insurance_type       : 5,
        served_mid           : manager_id,
        status               : input.status,
        created_at           : input.created_at,
        updated_at           : updatedDate
    };
    var clientData = {
        client_fullname      : input.client_fullname,
        client_address       : input.client_address,
        client_city          : input.client_city,
        client_phone         : input.client_phone,
        client_email         : input.client_email,
        insurance_type       : 5,
        created_at           : input.created_at,
        updated_at           : updatedDate
    };
    console.log(data);
    connection.query("UPDATE ic_clients SET ? WHERE id = ?", [clientData, id], function(err, rows) {
        if (err) {
          console.log("Error inserting: %s", err);
        } else {
          console.log("Данные успешно изменены и внесены в клиентскую базу");
        }
    });
    connection.query("UPDATE ic_accident_order SET ? WHERE id = ?", [data, id], function (err, rows) {
        if (err) {
            console.log("Error inserting: %s", err);
        } else {
            req.flash('success', 'Клиент успешно редактирован');
            res.redirect('/insurance/accident/clients');
        }
    });
});

router.get('/insurance/accident/client/delete/:id', isLoggedIn, function(req, res, next) {
  var id = req.params.id;
  var client = 'DELETE FROM ic_accident_order WHERE id = ' + id + ' ';
  connection.query(client, function(err, rows) {
    if (err) {
      console.log('Error deleting : %s', err);
    } else {
      req.flash('success', 'Заявка успешна удалена');
      res.redirect('/insurance/accident/clients');
    }
  });
});










// Authenticated User Middleware
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();
	res.redirect('/login');
}



module.exports = router;
