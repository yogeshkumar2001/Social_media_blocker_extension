let siteName = document.querySelector("#site-name");
let blockedList = document.querySelector("#blocked-list");
let blockBtn = document.querySelector("#block-site");

let localBlockList = [];
chrome.runtime.sendMessage({type:"Get"} ,function(blockList){
    localBlockList = blockList;
    for(let i= 0 ;i< localBlockList.length ; i++){
        addBlockSitesToUi(localBlockList[i].site);
    }
})



function addBlockSitesToUi(site){
        // <li class="item d-fllist-group-ex justify-content-between">Youtube  <button class="btn btn-danger">UNBLOCK</button></li>
        let li = document.createElement("li");
        li.classList.add("list-group-item");
        li.classList.add("d-flex");
        li.classList.add("justify-content-between");
        li.innerHTML = site;
    
        let button = document.createElement("button");
        button.classList.add("btn");
        button.classList.add("btn-danger");
        button.innerHTML = "UNBLOCK";
    
        
        button.addEventListener("click" , function(){
            li.remove();
            chrome.runtime.sendMessage({type:"Unblock" , site} ,function(response){
                console.log(response);
            })
        })
        li.append(button);
        blockedList.append(li);
}

siteName.addEventListener("keyup" , function(e){
    // console.log(e.keyCode);
    if(e.keyCode == "13"){
        blockBtn.click();
    }
})
blockBtn.addEventListener("click" , function(){
    let site = siteName.value;
    if(site){
        addBlockSitesToUi(site);
        siteName.value="";
        chrome.runtime.sendMessage({type:"Add" , site} , function(response){
            console.log(response)
        });
    }
})