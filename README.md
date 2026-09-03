#DevTinder
-Created a Vite+React project
-Remove unneccesary code
-Install TailwindCss
-Install daisyui
-Add navbar component to App.jsx
-Create a NavBar.jsx seperate common file 
-Installed reactrouterdom
-Create a Login 
-Install Axios
-CORS - install cors at backend and add middleware with configuration: origin,credetials:true
-Whenever you are making an api call pass to axios=>{withCredentials:true} // withoutcredentials true we will not get token back
-Install Redux toolkit - https://redux-toolkit.js.org/tutorials/quick-start
-configureStore => Provider =>createSlice => add reducer to store
-Create a store/ configure store
-Add a provider to the application - app.jsx
-Create a slice and export things
-add reducer to store
-Add reduux tools in chrome
-Login and see if your data is comming crct in store
-Navbar should update as soon as user logs in
-Refactor our code to add constants file  + create components folder
-should not be able to add other routes without login
-if token is not present ,redirect user to login page
-Logout
-ProfilePage





#Deployment
-Signup on AWS
-Launch Instance
-chmod 400 secret.pem 
-connected to maching using ssh -i "devTinder-secret.pem" ubuntu@ec2-51-21-182-139.eu-north-1.compute.amazonaws.com
-Install node version 24.xx.0 same as local node version
-git clone 2 projects
Frontend
    -in ubuntu installe dependencies  by npm install
    -npm run build on both ubuntu and local
    -sudo apt update
    -sudo apt install nginx
    -sudo systemctl start nginx
    -sudo systemctl enable nginx 
    -copy code from dist(build files) to var/www/html for that use  sudo scp -r dist/* /var/www/html
    -Enable port 80 on your instance
Backend
   -if there is any git changes make sure git pull if its done after cloning git into ubuntu
   -npm run start
   -enable port 7777 fothat allow ec2 instance public ip on mongodb server 
   -pm2 installationm will help you to manage and keep your application online 24/7 by - (npm install -g pm2) and
    do pm2 start npm -- start so that it will work in background, to change name pm2 start npm --name "devTinder" -- start
    -pm2 logs to see logs
    -to clear logs- pm2 flush (<name> of application). so pm2 flush npm-this npm is from table
    -pm2 list, pm2 stop <name>, pm2 delete <name>, 
    -config nginx= sudo nano etc/nginx/sites-available/default

nginx Config:
 server_name 51.21.182.139;
    location /api/ {
        proxy_pass http://localhost:7777/;

        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

-After configuring restart nginx by sudo systemctl restart nginx
-Modify in frontend in constants change baseurl from  "http://localhost:7777" to "/api"



#Adding a custom name domaim
 -purchased domain name for godaddy
 -signup for cloudfare
 -change the nameservers on godaddy and point it to cloudfare
 -wait for sometime till your name servers are updated
 -Enable SSL for website as flexible

#Sending Emails via ses
-create iam user 
-give access to AMAZONSESFullAccess
-Amzon SES:create an identity
-Verify your domain name
-verify an email adress identity
-Install AWS SDK-V3
-code Example  https://github.com/awsdocs/aws-doc-sdk-examples/tree/main/javascriptv3/example_code/ses#code-examples
-setup ses client
-acess credentials should be created in IAM under security credentials Tab
-add the credentials to the env file
-write code for sending emailadress
-Make the email dynamic by pasiing more parameters to run function 


#RazorPay Payment Gateway Integration
-signup on razorpay & complete KYC
-created ui for premium page
-creating an api for create order in Backend 
-added my key and secret in env file
-Intialized razorpay in utils
-creating order on razorpay
-create schema and model
-saved the order in payments collection
-make the API dynamic
-setup razorpay webhook on your live api
-create webhook api
-my secretkey in webhook-DEVTINDER$123
-Reference -https://github.com/razorpay/razorpay-node/tree/master/documents
https://razorpay-881012b3.mintlify.app/docs/payments/server-integration/nodejs/integration-steps#integrate-with-razorpay-payment-gateway 
https://razorpay-881012b3.mintlify.app/docs/webhooks/validate-test
https://razorpay.com/docs/webhooks/payments


#Realtime chat using websocket(socket.io)
https://socket.io/docs/v4/tutorial/introduction go through this