/**
 * =====Server deploy in Heroku
 * 
 * 
 * -------One time in Computer
 * ------------------------x    
 * 1.Create Heroku Account
 * 2.Verify Email
 * 3.install heroku CLi
 * 4.login Heroku in server cmd
 * ===================================
 * For Each Project one time
 * ==============================
 * 1.heroku create on cmd code
 * 2.make sure : git add,git commit,git push
 * 3.git push heroku main
 * 4.Go to Heroku dashboard > Current Project > project setting > Reveal config
 * 5.Copy paste config var from local project code {.env} file
 * 6.Make sure mongodb network ip access in everyWhere(0.0.0.0)
 * 
 * ==========================================
 * ===> Update server <==
 * 1.when make change in server site
 * 2.make sure : git add,git commit,git push
 * 3.git push heroku main
 * ==========================================
 * ===> connect Server to client site <===
 * 
 * 
 * 
 */