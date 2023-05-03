let liStr ='';
let myLeads = []
let i=0;

document.addEventListener('DOMContentLoaded',function(){ //run js only after doc is loaded
    const bdy=document.getElementById('bdy');
    const p_chk=document.getElementById('p_chk');
    const mainchk = document.getElementById('mainchk'); 
    const edit_btn=document.getElementById('edit-btn'); 
    const ulEl = document.getElementById('ul-el');
    const chkbx = ulEl.getElementsByClassName('chk');
    const inputBtn = document.getElementById('input-btn');
    const inputEl = document.getElementById('input-el');
    const delBtn = document.getElementById('delete-btn');
    const grabBtn = document.getElementById('grab-btn');
    const dload=document.getElementById('download');
    dload.disabled = true;
    
    //set body color to previous value as per change style button click
    bdy.style.background = localStorage.getItem("color");

    //get saved notes and links from local storage as arrays by using parse
    let fromLocal = JSON.parse(localStorage.getItem("leads")); 
        if(fromLocal){
            myLeads=fromLocal;
            renderLeads();
            ulEl.innerHTML = liStr ;
            dload.disabled = false;
            edit_btn.disabled=false;
            delBtn.disabled=false;
                    }
        //grab url from chrome tab
        grabBtn.addEventListener("click",function(){ 
            chrome.tabs.query({active: true,currentWindow: true},function(tabs){
            myLeads.push(tabs[0].url);
            console.log(myLeads);
            localStorage.setItem('leads',JSON.stringify(myLeads));
            renderLeads();
              })
        })
        
     
        //saving text box entered notes
        inputBtn.addEventListener("click",function(){
            if(inputEl.value==''){
                console.log('write Something');
            } else { 
                myLeads.push(inputEl.value);
                localStorage.setItem('leads',JSON.stringify(myLeads));
                renderLeads();
                inputEl.value='';
                ulEl.innerHTML = liStr;
                    }
                return false;
        })
    
        //changing color of background
        delBtn.addEventListener("click",function(){
            bdy.style.background =  getRandomColor();
            let newColor = bdy.style.background;
            localStorage.setItem('color',newColor);//save color to local storage to access next time
        })

    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }
  
      //edit and delete button
      edit_btn.addEventListener('click',function(){
        if(edit_btn.textContent === 'Edit'){
            inputBtn.disabled=true;
            delBtn.disabled=true;
            grabBtn.disabled=true;
            dload.disabled=true;
            edit_btn.textContent='Delete';
            p_chk.style.visibility='visible';
            mainchk.style.visibility = 'visible';
           
            for(let i=0;i<chkbx.length;i++){
                chkbx[i].style.visibility = 'visible';
            }
               } 
        else {
             edit_btn.textContent='Edit';
             inputBtn.disabled=false;
             delBtn.disabled=false;
             grabBtn.disabled=false;
             p_chk.style.visibility='hidden';
             mainchk.style.visibility = 'hidden';
       
               if(mainchk.checked){

                    localStorage.clear();
                    edit_btn.disabled=true;
                    myLeads=[];
                    mainchk.parentElement.textContent="";
                    ulEl.innerHTML="";
                    edit_btn.textContent = 'Edit'
                    p_chk.innerHTML=''
        
                } else{
                     let demoItems = [];
                     let j=0;
                        //to delete selected individual items
                         for(let i=0;i<chkbx.length;i++){
                              if(chkbx[i].checked){
                                 chkbx[i].parentElement.innerHTML='';
                                 i=i-1;
                              }else{
                                 demoItems[j] = chkbx[i].parentElement.textContent; 
                                 j++;
                                    }
                                        }
         
                     myLeads=demoItems; //here myLeads has elements of demoItems after if and for condition for check box
                     console.log(myLeads.length);
                         
                        if(myLeads.length===0){
                            localStorage.clear();
                            edit_btn.disabled=true;
                            dload.disabled = true;
                            ulEl.innerHTML="";
                        }else{
                            localStorage.setItem('leads',JSON.stringify(myLeads));
                              }
            
                        for(let i=0;i<chkbx.length;i++){
                            chkbx[i].style.visibility = 'hidden';
                         }
                      
                             }
     
                                  }
        return false;
    })


        function renderLeads(){
            for(i;i<myLeads.length;i++){
                let j =myLeads.length - 1;
                let demolead = JSON.stringify(myLeads[i]);
                let lnkInd = demolead.indexOf('.');
                // checking whether . is present to verify its link
                    if(lnkInd===-1){
                        liStr += 
                        `<li> 
                        <input type="checkbox" class="chk" ><label class="lbl">${myLeads[j-i]}</label></input>
                        </li>` 
           

                    }else{
                        liStr += 
                        `<li>
                        <input type="checkbox" class="chk" ></input> <label class="lbl"><a  
                        target="_blank" href="${myLeads[j-i]}">${myLeads[j-i]} 
                        </a></label>
                        </li>`
    
                          }
     
                               }

                                    }

        //saving offline on clicking download
        const el = (sel, par) => (par || document).querySelector(sel);
        const elNew = (tag, prop) => Object.assign(document.createElement(tag), prop);
        // Create file and download it:
        const createAndDownload = (content,  type = "text/plain") => {
            const file = new Blob([content], { type });
            const href = URL.createObjectURL(file);
            const elAnchor = elNew("a", { href, download });
            el("body").append(elAnchor);
            elAnchor.click();
            elAnchor.remove();
            URL.revokeObjectURL(href);
                            };


        // Usage on download button event click
            let text= ulEl.textContent;
            el("#download").addEventListener("click", () => {
            createAndDownload(text, "text/plain");
              });



        //when select all checkbox is checked
        mainchk.addEventListener('click',function(){
            if (mainchk.checked){
                for(let i=0;i<chkbx.length;i++){
                    chkbx[i].checked = true;
             }
            }else{
                for(let i=0;i<chkbx.length;i++){
                    chkbx[i].checked = false;
                    }
                        }
       
                             })
 
    return false;
})
