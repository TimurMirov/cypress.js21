describe('Проверка авторизации', function () {

    it('Верный логин и верный пароль', function () {
         cy.visit('https://login.qa.studio/'); // Зашли на сайт
         cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)'); // Проверяю цвет кнопки восстановить пароль

         cy.get('#mail').type('german@dolnikov.ru'); // Ввели верный логин
         cy.get('#pass').type('iLoveqastudio1'); // Ввели верный пароль
         cy.get('#loginButton').click(); // Нажал войти

         cy.get('#messageHeader').contains('Авторизация прошла успешно'); // Проверяю, что после авторизации вижу текст
         cy.get('#messageHeader').should('be.visible'); // Текст виден пользователю
         cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // Есть крестик и он виден для пользователя

     })

     it('Верный логин и неверный пароль', function () {
        cy.visit('https://login.qa.studio/'); // Зашли на сайт
        cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)'); // Проверяю цвет кнопки восстановить пароль

        cy.get('#mail').type('german@dolnikov.ru'); // Ввели верный логин
        cy.get('#pass').type('iLoveqastudio15'); // Ввели неверный пароль
        cy.get('#loginButton').click(); // Нажал войти

        cy.get('#messageHeader').contains('Такого логина или пароля нет'); // Проверяю, что после авторизации вижу текст
        cy.get('#messageHeader').should('be.visible'); // Текст виден пользователю
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // Есть крестик и он виден для пользователя

    })

    it('Проверка, что в логине есть @', function () {
        cy.visit('https://login.qa.studio/'); // Зашли на сайт
        cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)'); // Проверяю цвет кнопки восстановить пароль

        cy.get('#mail').type('germandolnikov.ru'); // Ввел логин без @
        cy.get('#pass').type('iLoveqastudio1'); // Ввеливерный пароль
        cy.get('#loginButton').click(); // Нажал войти

        cy.get('#messageHeader').contains('Нужно исправить проблему валидации'); // Проверяю, что после авторизации вижу текст
        cy.get('#messageHeader').should('be.visible'); // Текст виден пользователю
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // Есть крестик и он виден для пользователя

    })

    it('Проверка восстановления пароля', function () {
        cy.visit('https://login.qa.studio/'); // Зашли на сайт
        cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)'); // Проверяю цвет кнопки восстановить пароль


        cy.get('#forgotEmailButton').click(); // Нажимаю восстановить пароль

        cy.get('#mailForgot').type('german@dolnikov.ru'); // Ввел почту для восстановления
        cy.get('#restoreEmailButton').click(); // Нажал отправить код

        cy.get('#messageHeader').contains('Успешно отправили пароль на e-mail'); // Проверяю на совпадение текст
        cy.get('#messageHeader').should('be.visible'); // Текст виден пользователю
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // Есть крестик и он виден для пользователя

    })

    it('Неверный логин и верный пароль', function () {
        cy.visit('https://login.qa.studio/'); // Зашли на сайт
        cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)'); // Проверяю цвет кнопки восстановить пароль

        cy.get('#mail').type('germann@dolnikov.ru'); // Ввел неверный логин
        cy.get('#pass').type('iLoveqastudio1'); // Ввели верный пароль
        cy.get('#loginButton').click(); // Нажал войти

        cy.get('#messageHeader').contains('Такого логина или пароля нет'); // Проверяю, что после авторизации вижу текст
        cy.get('#messageHeader').should('be.visible'); // Текст виден пользователю
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // Есть крестик и он виден для пользователя

    })

    it('Проверка на приведение к строчным буквам в логине', function () {
        cy.visit('https://login.qa.studio/'); // Зашли на сайт
        cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)'); // Проверяю цвет кнопки восстановить пароль

        cy.get('#mail').type('GerMan@Dolnikov.ru'); // Ввел логин
        cy.get('#pass').type('iLoveqastudio1'); // Ввели верный пароль
        cy.get('#loginButton').click(); // Нажал войти

        cy.get('#messageHeader').contains('Такого логина или пароля нет'); // Проверяю, что после авторизации вижу текст
        cy.get('#messageHeader').should('be.visible'); // Текст виден пользователю
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // Есть крестик и он виден для пользователя

    })
})

describe('Покупка аватара', function () {
    it('e2e тест на покупку нового аватара для тренера', function () {
        // Переходим на сайт
        cy.visit('https://pokemonbattle.ru/');
        
        // Логинимся
        cy.get('input[type="email"]').type('Timur21Rim@gmail.com'); // Замените YOUR_EMAIL на ваш логин
        cy.get('input[type="password"]').type('211506Pokemon'); // Замените YOUR_PASSWORD на ваш пароль
        cy.get('button[type="submit"]').click(); // Нажимаем кнопку входа
  
        // Ждем загрузки страницы
        cy.wait(2000);
  
        // Переходим в профиль тренера
        cy.get('.header__container > .header__id').click({ force: true });
  
        // Переходим в магазин
        cy.get('[href="/shop"]').click();
  
        // Выбираем первый доступный аватар с классом available
        cy.get('.available > button').first().click({ force: true });
  
        // Вводим данные карты для оплаты (замените на свои)
        cy.get('.credit').type('4620869113632996'); // Вводим номер карты
        cy.get('.k_input_ccv').type('125'); // Вводим CVV
        cy.get('.k_input_date').type('1225'); // Вводим срок действия карты
        cy.get('.k_input_name').type('John Doe'); // Вводим имя владельца карты
  
        // Кликаем по кнопке Оплатить
        cy.get('.pay-btn').click();
  
        // Вводим код подтверждения
        cy.get('#cardnumber').type('56456'); // Это условный код подтверждения из SMS
  
        // Отправляем данные оплаты
        cy.get('.payment__submit-button').click();
  
        // Проверяем сообщение об успешной покупке
        cy.contains('Покупка прошла успешно').should('be.visible');
    });


    
    describe('Покупка аватара', function () {
        it('e2e тест на покупку нового аватара для тренера', function () {
            // Переходим на сайт
            cy.visit('https://pokemonbattle.ru/');
            
            // Логинимся
            cy.get('input[type="email"]').type('Timur21Rim@gmail.com'); // Замените YOUR_EMAIL на ваш логин
            cy.get('input[type="password"]').type('211506Pokemon'); // Замените YOUR_PASSWORD на ваш пароль
            cy.get('button[type="submit"]').click(); // Нажимаем кнопку входа
    
            // Ждем загрузки страницы
            cy.wait(2000);
    
            // Переходим в профиль тренера
            cy.get('.header__container > .header__id').click({ force: true });
    
            // Переходим в магазин
            cy.get('[href="/shop"]').click();
    
            // Выбираем первый доступный аватар с классом available
            cy.get('.available > button').first().click({ force: true });
    
            // Вводим данные карты для оплаты (замените на свои)
            cy.get('.credit').type('4620869113632996'); // Вводим номер карты
            cy.get('.k_input_ccv').type('125'); // Вводим CVV
            cy.get('.k_input_date').type('1225'); // Вводим срок действия карты
            cy.get('.k_input_name').type('John Doe'); // Вводим имя владельца карты
    
            // Кликаем по кнопке Оплатить
            cy.get('.pay-btn').click();
    
            // Вводим код подтверждения
            cy.get('#cardnumber').type('56456'); // Это условный код подтверждения из SMS
    
            // Отправляем данные оплаты
            cy.get('.payment__submit-button').click();
    
            // Проверяем сообщение об успешной покупке
            cy.contains('Покупка прошла успешно').should('be.visible');
        });
    });
  });