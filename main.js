




var users = document.getElementById("users")
var chats = document.getElementById("chats")


var background = document.getElementById("background")

var writePost = document.getElementById("writePost")
var addPost = document.getElementById("addPost")

var allPosts = document.getElementById("allPosts")

var data = []


var currentUser2 = ""

var user2 = "";

var loginPage = document.getElementById("loginPage")
var signUpPage = document.getElementById("signUpPage")
var home = document.getElementById("home")



function login() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    
    // ...
       
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });

   email = ""
   password = ""

}

// ===========================================================

document.addEventListener("DOMContentLoaded", () => {
  onAuthStateChanged(auth, (user) => {

    if (user) {
      loginPage.style.display = "none";
      signUpPage.style.display = "none";
      home.style.display = "block";
      console.log("User is logged in:", user.uid);

      getAllUsers(user);
      
      user2 = user
      
    } else {
      
      loginPage.style.display = "flex";
      signUpPage.style.display = "none";
      home.style.display = "none";
      console.log("User is not logged in");
    }
  });
});


// ===========================================================
function userSignOut () {
  signOut(auth).then(() => {
    
  }).catch((error) => {
    // An error happened.
  });
}
// ===========================================================
function showCreate() {
  loginPage.style.display="none";
  signUpPage.style.display="block";
}

function showLogin() {
  signUpPage.style.display="none";
  loginPage.style.display="block";
  loginPage.style.display="flex";


}


// #############################################################################
// DATE

function date() {

let year = document.getElementById("year");
let month = document.getElementById("month");
let day = document.getElementById("day");

  for (var yearN = 1970; yearN <= 2025; yearN++) {
    year.innerHTML += `<option value="${yearN}" >${yearN}</option>`;

  }
  // ///////
  
var months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

for (var m = 0 ; m < months.length ; m++){
  month.innerHTML += `<option value="${months[m]}" >${months[m]}</option>`;
}

// ///////qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq
// ///////qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq
var Days = 32 ;

month.addEventListener("change",(e)=>{
var T = e.target.value

  if ( T == 'May') {
  
   var Days = 12 ;
  
} 
});

for (var d = 1 ; d < Days ; d++){
  day.innerHTML += `<option value="${d}" >${d}</option>`;
}
}
date();


// ==========================================================
// ==========================================================
// ==========================================================

function  create() {

let Fname = document.getElementById("Fname")
let Sname = document.getElementById("Sname")
let genderC = document.getElementById("genderC")
let emailC = document.getElementById("emailC")
let passwordC = document.getElementById("passwordC")

  // // Create a reference to the file in Firebase Storage
  // const storageRef = ref(storage, `uploads/male.jpg`)

  // // Upload the file
  // uploadBytes(storageRef, male.jpg)
  //   .then((snapshot) => {
  //     console.log("File uploaded successfully!");
  //   })
  //   .catch((error) => {
  //     console.error("Error uploading file:", error);
  //   });



  
   var gender = document.querySelector('input[name="gender"]:checked');

  if (
    !emailC ||
    !passwordC ||
    !Fname ||
    !Sname ||
    !year ||
    !month ||
    !day ||
    !gender  ){ 
  
    alert("Please fill out all fields before proceeding.");
    
  }
   else{  
  //  Use Firebase Authentication's createUserWithEmailAndPassword method
   createUserWithEmailAndPassword(auth, emailC, passwordC)
     .then((userCredential) => {
       // User created successfully
       var user = userCredential.user;
       console.log("User created:", user);
     
      //  ###############################################
      //  ###############################################

      // sendSignInLinkToEmail(auth, emailC, actionCodeSettings)
      // .then(() => {
      //   // The link was successfully sent. Inform the user.
      //   // Save the email locally so you don't need to ask the user for it again
      //   // if they open the link on the same device.
        
    
      //   window.localStorage.setItem('emailForSignIn', emailC);
      // })
      // .catch((error) => {
      //   const errorCode = error.code;
      //   const errorMessage = error.message;

      // });
      //  ############################################
      //  ############################################

      createUser(user.uid); // focus

     })
     .catch((error) => {
       const errorCode = error.code;
       const errorMessage = error.message;
       console.error("Error:", errorCode, errorMessage);
       alert(`Error: ${errorMessage}`);
     });
    
    }
   }
 
// ================================================================

function createUser(uid) {
  var gender = document.querySelector('input[name="gender"]:checked');

  var dataUser = {
    id: uid,
    firstName: Fname.value,
    lastName: Sname.value,
    email: emailC.value,
    password: passwordC.value,
    yearOfBirth: year.value,
    monthOfBirth: month.value,
    dayOfBirth: day.value,
    gender: gender.value,
  };

  setDoc(doc(db, "users", uid), dataUser)

    .then(() => {
      console.log("User created successfully!");
    })
    .catch((error) => {
      console.error("Error creating user:", error);
    });

    Fname.value = "";
  
    Sname.value = "";
      
    emailC.value = "";
     
    passwordC.value = "";
    
    year.value = "";
       
    month.value = "month";
      
    day.value = "day";
        
    gender.value = "";
 

  }

// ================================================================
// ================================================================


function searchResults() {
  let search = document.getElementById("search");
  let searchResults = document.getElementById("searchResults");
  let logo = document.querySelector("#search-side > img");
  // let logo = document.querySelector("#search-side > i");
  let backBtn = document.getElementById("back-btn");

  search.addEventListener("focus", (e) => {
    console.log("dddddddddddddd");
    searchResults.style.display='block'
    backBtn.style.display='block';
    logo.style.display='none'; 
  }
);
 search.addEventListener("blur", (e) => {
    console.log("dddddddddddddd");
    searchResults.style.display='none'
    backBtn.style.display='none'; 
    logo.style.display='block';
  }
);
}


window.addEventListener("DOMContentLoaded", searchResults);

// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
async function getAllUsers(currentUser) {
  try {
   

    const usersCollection = collection(db, "users");

    const q = query(usersCollection, where("id", "!=", currentUser.uid)); 
    const q2 = query(usersCollection, where("id", "==", currentUser.uid))    
   
    currentUserSnapshot = await getDocs(q2)

    if (!currentUserSnapshot.empty) {
      currentUserSnapshot.forEach((doc) => {

        currentUser2 = doc.data();  // == var up ==
//                                                                 #%# currentUser image #%#

      if(currentUser2.gender == "male"){
       image.innerHTML = `  <img src="male.jpg" style="width: 30px; height: 30px; border-radius: 50%;" alt="Profile">`
      }
      if(currentUser2.gender == "female"){
        image.innerHTML = `  <img src="female.jpg" style="width: 30px; height: 30px; border-radius: 50%;" alt="Profile">`
       }
       if(currentUser2.imageUrl){
        image.innerHTML = `  <img src="${currentUser2.imageUrl}" style="width: 30px; height: 30px; border-radius: 50%;" alt="Profile">`
       }
      

        
      });
    } else {
      console.log("Current user not found in the database.");
    }

    const querySnapshot = await getDocs(q);
     

    if (!querySnapshot.empty) {

      users.innerHTML= "";

      querySnapshot.forEach((doc) => {

           data.push(doc.data())
        users.innerHTML += `<p class="ps-2"><a href="#" onclick="showChats('${doc.data().firstName}','${doc.data().email}','${doc.id}')" class="text-decoration-none text-black">${doc.data().firstName}</a></p>`;
      

      });
    } else {
      console.log("No users found!");
    }
  } catch (error) {
    console.error("Error fetching users:", error.message);
  }
  getPosts();
  another(data)
}
//  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

 async function showChats(name , email , uid) {
  console.log(currentUser2);
  console.log(currentUser2.imageUrl);

  
  chats.innerHTML += `
   <div class="container col-3">
      <div class="card" style="width: 18rem;">
        <div class="card-header d-flex align-items-center">
          <img  style="width: 30px;" src="male.jpg" alt="Profile" class="rounded-circle me-2">
          <h5 class="mb-0">${name}</h5>
        </div>
        <div id="chatContainer-${uid}" class="card-body">
         
          <div class="mb-3" id="${email}">

          </div>
        </div>

        <div class="card-footer text-center row">
          <input id="${uid}" class="col-7 " style="border-radius: 20px;" type="text">
          <button class="col-1"></button>
          <button class="col-1"></button>
          <button class="col-2" onclick="send('${email}','${uid}') " > <i class="fas fa-paper-plane"></i>
          </button>
        </div>

      </div>
    </div>`
  
    getChats(uid); // اصحالي يا برنس

  }

  // &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

function send(email, uid) {
  var message = document.getElementById(uid).value;

  if (message == "") {
    alert("Message cannot be empty.");
    return;
  }

  const messageRef = ref(dbR, `Chats/${uid}/messages`);
  const messageRef2 = ref(dbR, `Chats/${currentUser2.id}/messages`);

  push(messageRef, {
    email2: currentUser2.email,
    email: email,
    message: message,
  })
  
    .then(() => {
      console.log("Message sent successfully!");
      document.getElementById(uid).value = ""; 
            
      
    })


    // push(messageRef2, {
    //   email: currentUser2.email,
    //   message: message,
    // })
    
    //   .then(() => {
    //     console.log("Message sent successfully!");
    //     document.getElementById(uid).value = ""; 
        
    //   })


    .catch((error) => {
      console.error("Error sending message:", error.message);
    });
      getChats(uid);  // set state

}

// ((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))

async function getChats(uid) {
  const messagesRef = ref(dbR, `Chats/${uid}/messages`);

  // 👇 تشيك إذا في بيانات أو لأ
  const snapshot = await get(messagesRef);

  if (!snapshot.exists()) {
    // ✨ مفيش داتا.. نعمل شات جديد
    await set(messagesRef, {
      firstMessage: {
        message: "مرحبًا! ده أول شات ✨",
        email: "system",
        email2: currentUser2.email,
      }
    });
    console.log("تم إنشاء شات جديد");
  }

  // 👂 نسمع الرسائل ونعرضها
  onValue(messagesRef, (snapshot) => {
    const messages = snapshot.val();
    const chatContainer = document.getElementById(`chatContainer-${uid}`);
    chatContainer.innerHTML = "";

    if (messages) {
      Object.keys(messages).forEach((key) => {
        const message = messages[key];
        const text = message.message;

        if (message.email2 == currentUser2.email) {
          chatContainer.innerHTML += `<p class="bg-info">${text}</p>`;
        } else {
          chatContainer.innerHTML += `<p class="bg-danger">${text}</p>`;
        }
      });
    } else {
      chatContainer.innerHTML = "<p class='text-muted'>لا توجد رسائل</p>";
    }
  });
}
//000000000000000000 ======================================

var imagePop = document.getElementById("imagePop")

function showImage(){
imagePop.style.display="block"
background.style.display="block"
}
function cancel(){
  imagePop.style.display="none"
  background.style.display="none"
  }
//8888888888888888 ======================================777777777777777
//8888888888888888 ======================================777777777777777
//8888888888888888 ======================================777777777777777

// var image = document.getElementById("image")

function uploadImage() {
  let fileInput = document.getElementById("fileInput");
  let file = fileInput.files[0];

  if (!file) {
    alert("Please select a file first.");
    return;
  }

  let metadata = {
    contentType: file.type,
  };

  let storageRef = ref2(storage, 'images/' + file.name);
  let uploadTask = uploadBytesResumable(storageRef, file, metadata);

  uploadTask.on(
    'state_changed',
    (snapshot) => {
      let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
    },
    (error) => {
      console.error("Upload failed:", error);
    },
    async () => {
      let downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
      console.log('File available at', downloadURL);
      
      console.log(currentUser2.id);
      

      try {
        let userDocRef = doc(db, "users", user2.uid);
      
        let userDoc = await getDoc(userDocRef);
      
        if (userDoc.exists()) {

          await updateDoc(userDocRef, {
            imageUrl: downloadURL,
          });
          console.log("Image URL updated successfully!");
        } else {

          await setDoc(userDocRef, {
            imageUrl: downloadURL,
          });
          console.log("Document created with image URL!");
        }
         cancel();

        alert("Image uploaded and profile updated successfully!");
      } catch (error) {
        console.error("Error updating/creating user profile:", error.message);
      }
      
    }
  );
}

// (((((((((((((((((((((((((((((((((((((((((())))))))))))))))))))))))))))))))))))))))))

writePost.addEventListener("input", () => {

  if (writePost.value !== "") {
    addPost.style.display = "block";  
  } else {
    addPost.style.display = "none";   
  }
});

// """"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""

async function post() {

  let postsCollection = collection(db, "users", user2.uid, "posts");

  let postInfo = writePost.value;  // var up ))

  await addDoc(postsCollection, {
    content: postInfo,
  })
  .then(() => {
    console.log("Post added successfully!");
  })
  .catch((error) => {
    console.error("Error adding post: ", error);
  });

  writePost.value = ""; 

  getPosts() // set state
  // another() pppp
}

async function getPosts() {
  const postsCollection = collection(db, "users", user2.uid, "posts");

  const postsSnapshot = await getDocs(postsCollection);

  if (!postsSnapshot.empty) {
    allPosts.innerHTML = "";

    postsSnapshot.forEach((doc) => {
      const postId = doc.id; 
      const postData = doc.data();
      
      

      allPosts.innerHTML += `
       <div class="card">
           <div class="card-body position-relative">
            
            <button onclick="deletePost('${postId}')" class="btn btn-danger position-absolute" style="top: 10px; right: 10px;">
                <i class="fa fa-trash"></i>
            </button>
            <h5 class="card-title"> "No Title" </h5>
            <p class="card-text">${postData.content}</p>
            <p class="text-muted" style="font-size: 12px;">Posted by: ===== </p>
            
            
            <div class="d-flex justify-content-around pt-3">
                
                <button class="btn btn-light d-flex align-items-center" style="border: none;">
                    <i class="fa fa-thumbs-up me-2"></i> Like
                </button>
        
               
                <button class="btn btn-light d-flex align-items-center" style="border: none;">
                    <i class="fa fa-comment me-2"></i> Comment
                </button>
        
               
                <button class="btn btn-light d-flex align-items-center" style="border: none;">
                    <i class="fa fa-share me-2"></i> Share
                </button>
            </div>
        </div>
       </div>
       <br>
      `;
    });
  } else {
    console.log("No posts found.");
  }
}

// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

function another(data) {
  console.log(data);

  data.forEach((doc2) => {

    console.log(doc2.firstName);

    const anotherUsers = collection(db, "users", doc2.id, "posts");

    getDocs(anotherUsers)
      .then((anotherUsersSnapshot) => {

        anotherUsersSnapshot.forEach((doc) => {
          console.log(doc.id, doc.data()); 

          const postId = doc.id; 
      const postData = doc.data();
      

          allPosts.innerHTML += `
          <div class="card">
              <div class="card-body position-relative">
               
               <button onclick="deletePost('${postId}')" class="btn btn-danger position-absolute" style="top: 10px; right: 10px;">
                   <i class="fa fa-trash"></i>
               </button>
               <h5 class="card-title"> "No Title" </h5>
               <p class="card-text">${postData.content}</p>
               <p class="text-muted" style="font-size: 12px;">Posted by: ===== </p>
               
               
               <div class="d-flex justify-content-around pt-3">
                   
                   <button class="btn btn-light d-flex align-items-center" style="border: none;">
                       <i class="fa fa-thumbs-up me-2"></i> Like
                   </button>
           
                  
                   <button class="btn btn-light d-flex align-items-center" style="border: none;">
                       <i class="fa fa-comment me-2"></i> Comment
                   </button>
           
                  
                   <button class="btn btn-light d-flex align-items-center" style="border: none;">
                       <i class="fa fa-share me-2"></i> Share
                   </button>
               </div>
           </div>
          </div>
          <br>
         `;
        });
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  });
}

  // (^^)(^^)(^^)(^^)(^^)(^^)(^^)(^^)(^^)(^^)(^^)(^^)(^^)(^^)(^^)(^^)(^^)(^^)(^^)(^^)(^^)(^^)


async function deletePost(postId) {
  const postRef = doc(db, "users", user2.uid, "posts", postId);

  try {
    await deleteDoc(postRef); 

    console.log("Post deleted successfully!");
  } catch (error) {
    console.error("Error deleting post:", error.message);
  }
  getPosts();  // set state
  // another(data); pp
  
}



// async function getApi() {
//   const url = 'https://the-mexican-food-db.p.rapidapi.com/';
//   const options = {
//     method: 'GET',
//     headers: {
//       'x-rapidapi-key': '1dc1da1053msh0d5875aff344efbp1650a8jsnfa647a4aa0a7',
//       'x-rapidapi-host': 'the-mexican-food-db.p.rapidapi.com'
//     }
//   };
  

  
//   try {
//     const response = await fetch(url, options);
//     const result = await response.json();
  
//     if (!Array.isArray(result)) {
//       throw new Error("Invalid data format from API");
//     }
  
//     for (const meal of result) {
//       if (!meal.id) {
//         console.warn("Skipping meal without ID:", meal);
//         continue;
//       }
  
//       // إنشاء مسار صحيح مع تحديد الساب كوليكشن
//       await setDoc(doc(db, "menu", "mexican", "items", meal.id.toString()), meal);
      
//       console.log("Added dish:", meal.id, meal.name);
//     }
  
//   } catch (error) {
//     console.error("Error:", error);
//   }










//   const url = 'https://burgers-hub.p.rapidapi.com/burgers';
// const options = {
// 	method: 'GET',
// 	headers: {
// 		'x-rapidapi-key': '1dc1da1053msh0d5875aff344efbp1650a8jsnfa647a4aa0a7',
// 		'x-rapidapi-host': 'burgers-hub.p.rapidapi.com'
// 	}
// };
//   try {
//     const response = await fetch(url, options);
//     const result = await response.json(); // تحويل النص إلى JSON
    
//     for (const meal of result)  {
//       await doc(db, "menu", "sandwiches", meal);
//       console.log(meal.id);
//       console.log(meal.name);
//     }
  
//   } catch (error) {
//     console.error(error);
//   }



  // try {
  //   var res = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=eba8b9a7199efdcb0ca1f96879b83c44`);
  //   var data2 = await res.json();
  //   var movies2 = data2.results;

  //   for (const film of movies2) { // استخدام for...of بدل forEach
  //     console.log(film['title']);

  //     await setDoc(doc(db, "pidzaa", film['id'].toString()), {  film }) // تحويل ID لنص وخزن object
  //       .then(() => {
  //         console.log(`Data for "${film['title']}" created successfully!`);
  //       })
  //       .catch((error) => {
  //         console.error("Error:", error);
  //       });
  //   }
  // } catch (error) {
  //   console.error("Failed to fetch data:", error);
  // }
// }

// getApi();

