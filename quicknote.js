let liStr ='';
let myLeads = []
let i=0;



document.addEventListener('DOMContentLoaded',function(){ //run js only after doc is loaded
    const bdy=document.getElementById('bdy');
    const p_chk=document.getElementById('p_chk');
    const mainchk = document.getElementById('mainchk'); 
    const edit_btn=document.getElementById('edit-btn'); 
    const ulEl = document.getElementById('ul-el');
    let chkbx = ulEl.getElementsByClassName('chk');
    const inputBtn = document.getElementById('input-btn');
    const inputEl = document.getElementById('input-el');
    const delBtn = document.getElementById('delete-btn');
    const grabBtn = document.getElementById('grab-btn');
    const dload=document.getElementById('download');
    // const li_div = document.getElementById('li_div');
    dload.disabled = true;
    
  
    // console.log(chkbx);

    // chkbx.addEventListener('click',function(){
    //     console.log('Case 1');
    // })

    inputEl.addEventListener("focus",function()
    {
        inputBtn.style.visibility='visible';
        inputBtn.style.borderBlockColor=  'skyblue';
    })


    inputEl.addEventListener("focusout",function()
    {
        inputBtn.style.borderBlockColor=  'whitesmoke';
    })


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
            // delBtn.disabled=false;
                    }
        //grab url from chrome tab
        grabBtn.addEventListener("click",function(){ 
            
            chrome.tabs.query({active: true,currentWindow: true},function(tabs){
                // myLeads = fromLocal;
                if(myLeads==null){ // otherwise myleads becomes null if fromlocal is deleted
                    myLeads=[];
                }
            myLeads.unshift(tabs[0].url);
            localStorage.setItem('leads',JSON.stringify(myLeads));
            renderLeads();

            
              })
        })
        
     
        //saving text box entered notes
        inputBtn.addEventListener("click",function(){
            if(inputEl.value==''){
                //do nothing
            } else { 
                // myLeads = fromLocal;
                if(myLeads==null){ // otherwise myleads becomes null if fromlocal is deleted
                    myLeads=[];
                }
                myLeads.unshift(inputEl.value);
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
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }
  
      //edit and delete button
      edit_btn.addEventListener('click',function(){
        if(edit_btn.textContent === 'Edit'){
            inputBtn.disabled=true;
            // delBtn.disabled=true;
            grabBtn.disabled=true;
            dload.disabled=true;
         
            edit_btn.textContent='Delete';
            edit_btn.style.color ='red';

            p_chk.style.visibility='visible';
            mainchk.style.visibility = 'visible';
            // li_div.style.visibility = 'visible';
           
            for(let i=0;i<chkbx.length;i++){
                chkbx[i].style.visibility = 'visible';
            }
               } 
        else {
             edit_btn.textContent='Edit';
             edit_btn.style.color ='whitesmoke';
             inputBtn.disabled=false;
            //  delBtn.disabled=false;
             grabBtn.disabled=false;
             p_chk.style.visibility='hidden';
             mainchk.style.visibility = 'hidden';
             

               if(mainchk.checked){
                    localStorage.clear();
                    localStorage.setItem('color',bdy.style.background)
                    edit_btn.disabled=true;
                    myLeads=[];
                    mainchk.parentElement.textContent="";
                    
                    edit_btn.textContent = 'Edit'
                    p_chk.innerHTML=''
                    ulEl.innerHTML="";
        
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
         
                         myLeads=demoItems; //only remaining li items in myLeads 
                     
                         
                        if(myLeads.length===0){
                            localStorage.clear();
                            localStorage.setItem('color',bdy.style.background)
                            edit_btn.disabled=true;
                            dload.disabled = true;
                            ulEl.innerHTML="";
                        }else{
                            localStorage.clear();
                            localStorage.setItem('color',bdy.style.background)
                            localStorage.setItem('leads',JSON.stringify(myLeads));
                            myLeads = JSON.parse(localStorage.getItem("leads"));
                            ulEl.innerHTML="";
                            liStr = '';
                            renderLeads();
                            ulEl.innerHTML = liStr ;
                           
                            
                              }
            
                        for(let i=0;i<chkbx.length;i++){
                            chkbx[i].style.visibility = 'hidden';
                         }
                      
                             }
     
                                  }
                                  localStorage.setItem('color',bdy.style.background)
                                  return false;
       
    })


        function renderLeads(){
            for(let i=0;i<myLeads.length;i++){
                
                let demolead = JSON.stringify(myLeads[i]);
                let lnkInd = demolead.indexOf('.');
                // checking whether . is present to verify its link
                    if(lnkInd===-1){
                        liStr += 
                        `<li> 
                         <input type="checkbox" class="chk" ></br><label class="lbl">${myLeads[i]}</label></input>
                        </li>` 
           

                    }else{
                        liStr += 
                        `<li>
                        <input type="checkbox" class="chk" ></input><label class="lbl"><a  
                        target="_blank" href="${myLeads[i]}">${myLeads[i]} 
                        </a></label>
                        </li>`
    
                          }
     
                               }

                                    }
  document.querySelectorAll('.chk').forEach( button => {
                                       
       button.onclick = function () {

        if(this.id == 'mainchk'){
            console.log('got me')
            if (mainchk.checked==true){
                for(let i=0;i<chkbx.length;i++){
                    chkbx[i].checked = true;
                    console.log('all true');
             }
           
                
            }else if(mainchk.checked==false){
                for(let i=0;i<chkbx.length;i++){
                    chkbx[i].checked = false;
                    console.log('all false');
                    }
                        }
           }  
        else {

            console.log('next time')
            let count = 0;
            for(let i=0;i<chkbx.length;i++){
                 if(chkbx[i].checked == true){
                     console.log('case 1');
                                    }
                   else{
                     count =1;
                     console.log('case 2');
                              }
                                                                     
                                  }
                                                             
                 if(count===1){
                     console.log('case 3');
                     mainchk.checked = false;
                                                     
                            }
                 else{
                     console.log('case 4');
                     mainchk.checked = true;
                            }

        }
       
       
       


 
                                        
                        }
                                });
                                 
            
                         
                                        
                                    





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
          
            // console.log('inside main chk');
            // if (mainchk.checked==true){
            //     for(let i=0;i<chkbx.length;i++){
            //         chkbx[i].checked = true;
            //         console.log('all true');
            //  }
           
                
            // }else if(mainchk.checked==false){
            //     for(let i=0;i<chkbx.length;i++){
            //         chkbx[i].checked = false;
            //         console.log('all false');
            //         }
            //             }
       
                             })
 
    return false;
})




