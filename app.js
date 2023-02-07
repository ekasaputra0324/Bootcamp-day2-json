const readline = require('readline');
const validator = require('validator');
const fs = require('fs');
// const { json } = require('stream/consumers');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// const data = [];
var filename = "data/contact.json";
rl.question("siapa nama kamu? " , function(param){
    nama = param;
    rl.question(" email kamu? " , function(param){
        if (validator.isEmail(param)  == true) {
            email = param    
            rl.question(" nomer hp? ", function(param){
                if (validator.isMobilePhone(param,'id-ID')  == true) {
                    nomer = param
                    console.log(
                    'Nama : '+nama,
                    'Email : '+email,
                    'Nomer Hp: '+nomer
                    );
                 fs.readFile('data/contact.json', 'utf8', ( err, data )=>{
                    if (err) {
                        console.log(err);
                    }
                    json = JSON.parse(data);
                    json.push({
                        nama: nama,
                        email: email,
                        nomer: nomer
                    });
                   let parse = JSON.stringify(json);
                    fs.writeFile(filename, parse, 'utf8', (err) => {
                     if (err) {
                        console.log(err);
                     }
                     console.log("data berhasil di tambahkan");   
                    });
                 });
                }else{
                    console.log('format number phone harus indo');
                }   
            });
        }else{
            console.log('format email harus sesuai');
        }
        rl.close()
    });
});
