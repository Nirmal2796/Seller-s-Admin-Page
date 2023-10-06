const sprice = document.getElementById('sprice');
const prd_name = document.getElementById('prd_name');

const total = document.getElementById('total');

var sum = 0;

const form = document.getElementById('form');
const ul = document.getElementById('product-list');



form.addEventListener('submit', onSubmit);
ul.addEventListener('click', removeUser);


document.addEventListener('DOMContentLoaded',
    axios.get("https://crudcrud.com/api/e3a52f0b834d4c49812af438db9d999d/products")
        .then(res => {
            
            //console.log(res.data);
           
                for (let i in res.data) {
                    showUserOnScreen(res.data[i]);
                    sum += parseInt(res.data[i].sprice);
                }
            
            showTotal(sum);
    

        })
        .catch(err => {
            console.log(err)
        })
);


    




function showUserOnScreen(obj) {


    var li = document.createElement('li');

    li.appendChild(document.createTextNode(obj.sprice + '-'));

    li.appendChild(document.createTextNode(obj.prd_name));

    var del_btn = document.createElement('button');
    del_btn.className = 'btn btn-danger btn-sm float-right delete margin-auto';
    del_btn.appendChild(document.createTextNode('Delete Product'));


    li.appendChild(del_btn);

    li.style.padding = "2px"; 
    li.style.margin = "5px";

    
   
    ul.appendChild(li);

}




function onSubmit(e) {
    e.preventDefault();

    if (sprice.value == '' || prd_name.value == '') {
        msg.innerHTML = '<b>Please enter all fields</b>';

        setTimeout(() => {
            msg.remove();
        }, 2000);
    }
    else {


        const product = {
            sprice: sprice.value,
            prd_name: prd_name.value

        }

        axios.post("https://crudcrud.com/api/e3a52f0b834d4c49812af438db9d999d/products", product)
            .then((response) => {
                showUserOnScreen(response.data);
                
                sum = sum + parseInt(response.data.sprice);
                showTotal(sum);

            })
            .catch(err => {
                console.log(err)
            })
        
        form.reset();
    }
}


function removeUser(e) {

    if (e.target.classList.contains('delete')) {

        var li = e.target.parentElement;
        var prd_key = li.childNodes[1].textContent;


        //localStorage.removeItem(email_key);

        axios.get("https://crudcrud.com/api/e3a52f0b834d4c49812af438db9d999d/products")
            .then(res => {

                for (let i in res.data) {
                    if (res.data[i].prd_name == prd_key) {
                        const id = res.data[i]._id;
                        //console.log(typeof(id));
                       
                        axios.delete(`https://crudcrud.com/api/e3a52f0b834d4c49812af438db9d999d/products/${id}`)
                        ul.removeChild(li);
                        sum = sum - parseInt(res.data[i].sprice);
                        showTotal(sum);
                        
                        break;
                    }
                }

            })
            .catch(err => {
                console.log(err)
            })


    }
}


function showTotal(sum) {
   
    
    total.innerText = `Total Value Worth of Products: Rs. ${sum}`;
    
}