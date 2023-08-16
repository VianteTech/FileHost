/* -- Modules and JSON Objects -- */
let obj = require('./data/host.json')
const port = process.env.PORT || 8080,
      fs = require('fs'),
      url = require('url'),
      path = require('path'),
      http = require('http'),
      express = require('express'),
      bodyParser = require('body-parser'),
      app = express();
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json());
/* -- File Hosting -- */
function DeployChanges(){//Create a function named DeployChanges.
    for(let i=0;i<obj.data.length;i++){// For loop | We get the length of obj.data (From host/host.json with key:"data". 
        if(obj.extensions[i]=="image"){//Check if each of the obj.extensions satisfies the condition.
            //Create a variable named content ("Adding backticks").
            let content = 
`<!DOCTYPE html> 
<html lang="vi"> 
<head> 
<title>${obj.file[i]}</title> 
</head> 
<body> 
<p><b>Hosted By <a href="https://render.com" target="_blank">render.com</a>!</b></p>
<p><a href="https://thuong.pages.dev/">Made by Thuong</a></p>
<img title="${obj.file[i]}" alt="This is a file about ${obj.file[i]}" src="${obj.base64[i]}">
<p class="p1">&copy;Copyright Reserved: 2023 - Present (Thuong)</p>
<p class="p1">Built with Nodejs | Expressjs | HTML and CSS</p>
<style>
body{
    background:black;
    color:white;
    width: 90%;
}
p{
    text-align: center;
    font-size: 20px;
}
video,img{
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 50%;
    height: auto;
}
.p1{
    animation: change 4s linear infinite;
}
@keyframes change {
    0% {color:pink}
    13.5% {color:red}
    26% {color:orange}
    38.5% {color:yellow}
    51% {color:green}
    63.5% {color:turquoise}
    86% {color:indigo}
    100% {color:violet}
}
</style>
</body> 
</html>`
            Host(obj.file[i],content)//Call the function Host with 2 arguments.
        }
        else if(obj.extensions[i]=="video"){//Same for the above.
            let content = 
`<!DOCTYPE html> 
<html lang="vi"> 
<head> 
<title>${obj.file[i]}</title> 
</head> 
<body> 
<p><b>Hosted By <a href="https://render.com" target="_blank">render.com</a>!</b></p>
<p><a href="https://thuong.pages.dev/">Made by Thuong</a></p>
<video title="${obj.file[i]}" alt="This is a file about ${obj.file[i]}" src="${obj.base64[i]}" autoplay controls></video>
<p class="p1">&copy;Copyright Reserved: 2023 - Present (Thuong)</p>
<p class="p1">Built with Nodejs | Expressjs | HTML and CSS</p>
<style>
body{
    background:black;
    color:white;
    width: 90%;
}
p{
    text-align: center;
    font-size: 20px;
}
video,img{
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 50%;
    height: auto;
}
.p1{
    animation: change 4s linear infinite;
}
@keyframes change {
    0% {color:pink}
    13.5% {color:red}
    26% {color:orange}
    38.5% {color:yellow}
    51% {color:green}
    63.5% {color:turquoise}
    86% {color:indigo}
    100% {color:violet}
}
</style>
</body> 
</html>`
            Host(obj.file[i],content)
        }
        else if(obj.extensions[i]=="application/pdf"||obj.extensions[i]=="text/plain"){
            let content=
`<!DOCTYPE html> 
<html lang="vi"> 
<head> 
<title>${obj.file[i]}</title> 
</head> 
<body> 
<p><b>Hosted By <a href="https://render.com" target="_blank">render.com</a>!</b></p>
<p><a href="https://thuong.pages.dev/">Made by Thuong</a></p>
<iframe src="${obj.base64[i]}"></iframe>
<p class="p1">&copy;Copyright Reserved: 2023 - Present (Thuong)</p>
<p class="p1">Built with Nodejs | Expressjs | HTML and CSS</p>
<style>
body{
    background:black;
    color:white;
    width: 90%;
}
p{
    text-align: center;
    font-size: 20px;
}
iframe{
    overflow: auto;
    display: block;
    margin-left: auto;
    margin-right: auto;
    height: 700px;
    width: 100%;
}
.p1{
    animation: change 4s linear infinite;
}
@keyframes change {
    0% {color:pink}
    13.5% {color:red}
    26% {color:orange}
    38.5% {color:yellow}
    51% {color:green}
    63.5% {color:turquoise}
    86% {color:indigo}
    100% {color:violet}
}
</style>
</body> 
</html>`
            Host(obj.file[i],content)//Same here as well.
        }
        else{
        }//if none of the conditions satisfy, do nothing or you can add return;
    }
}
function Host(filename,content){//Create a function named Host with 2 arguments.
    fs.writeFile(`./backend/host/${filename}.html`, content, err => {//Create a file if it doesn't exist, else overwrite the file.
        if (err)
            console.error(err);
        //Check if there is an error.
    });
}
function RequestChanges(arg,arg1){//Create a function named RequestChanges with 2 arguments.
    newarg=arg.split("|")//Create a new variable named newarg, here newarg is an array.
    newarg1=arg1.split("|")//Same as above but the variable's name is newarg1.
    for(let i=0;i<newarg.length;i++){//For Loop.
        newarg[i]=newarg[i].trim()//We remove all the backspaces from the right and left.
        if(newarg1[i].slice(5,newarg1[i].indexOf(";"))=="text/plain" && path.parse(newarg[i]).ext==".txt"){
            //Check if each of the elements of newarg1 satisfies the above conditions.
            //We used path.parse(each of the elements of arg1).ext to get the extensions of the file. 
            obj["base64"].push(newarg1[i])
            obj["data"].push(newarg[i])
            obj["extensions"].push("text/plain")
            obj["file"].push(path.parse(newarg[i]).name)
            //We push datas to each of the keys of obj.
            fs.writeFile('./backend/data/host.json', JSON.stringify(obj,null,4), function writeJSON(err) {
                if (err) return console.log(err);//Check if there is an error
            });
            //Here host.json file will get some changes.
            DeployChanges(); //Call function DeployChanges()
        }
        else if(newarg1[i].slice(5,newarg1[i].indexOf(";"))=="application/pdf" && path.parse(newarg[i]).ext==".pdf"){
            //Same for the above.
            obj["base64"].push(newarg1[i])
            obj["data"].push(newarg[i])
            obj["extensions"].push("application/pdf")
            obj["file"].push(path.parse(newarg[i]).name)
            fs.writeFile('./backend/data/host.json', JSON.stringify(obj,null,4), function writeJSON(err) {
                if (err) return console.log(err);
            });
            DeployChanges(); 
        }
        else{
            //Here as well
            obj["base64"].push(newarg1[i])
            obj["data"].push(newarg[i])
            obj["extensions"].push(newarg1[i].slice(5,newarg1[i].indexOf("/")))
            obj["file"].push(path.parse(newarg[i]).name)
            fs.writeFile('./backend/data/host.json', JSON.stringify(obj,null,4), function writeJSON(err) {
                if (err) return console.log(err);
            });
            DeployChanges();
        }
    }
}
app.post('/file', (req, res) => {//When you submitted the form, the values will be transfered to server.js.
    RequestChanges(req.body.fname,req.body.dlink)//Call the function RequestChanges.
    return;// return nothing.
});
app.get('/file', (req,res)=>{
    return res.send(
`<h1>
Thank you for using, please wait for your deployment in 4 seconds.
</h1>
<p style="display:none" id="wait">Typing on the search bar "https://domain-name/host/(filename without extension).html".</p>
<script type="text/javascript">
    setTimeout(()=>{
        document.getElementById("wait").style.display="block";
    },4000)
</script>`);
});
//If possible, when you submitted the form, you'll be directed.
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
})
//Home page.
app.get('/host', (req, res)=>{
    fs.readFile('./backend/data/host.json',null, function (err, json){
        if (err) {
            res.writeHead(404);
            res.write('404|File Not Found');
        }else{
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.write(json);
        }
        res.end()
    })
})// Just an example for Home Page, but you can see the host.json data.
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});//Listen to Port 8080.
app.get('*', (req, res) => {
    var q = url.parse(req.url,true);
    var filename = "./backend/host" +q.pathname;
    fs.readFile(filename,function(err,data){
        if(err){
            res.writeHead(404,{'Content-Type':'text/html'});
            return res.end("Page Not Found!")
        }
        res.writeHead(200,{'Content-Type':'text/html'});
        res.write(data);
        return res.end();
    })
})
//Check all requests.