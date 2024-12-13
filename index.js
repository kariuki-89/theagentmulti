function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function setInputValueById(id, value) {
  const element = document.getElementById(id);
  console.log("karis",value,element.innerHTML)
  
    element.innerHTML = value;
 
}

function checkCookie() {
  let user = getCookie("theagentnaviagatemove");
  if (user != "") {
    alert("Welcome again " + user);
  } else {
    user = prompt("Please enter your name:", "");
    if (user != "" && user != null) {
      setCookie("theagentnaviagatemove", user, 365);
    }
  }
}

// Function to show an element
function showElementById(id) {
  const element = document.getElementById(id);
  if (element) {
    element.style.display = "flex"; // Makes the element visible
  }
}

// Function to hide an element
function hideElementById(id) {
  const element = document.getElementById(id);
  if (element) {
    element.style.display = "none"; // Hides the element
  }
}

document.addEventListener("DOMContentLoaded", () => {
    // Select the login button
    const signUpButton = document.querySelector("#signup-button");
    const logInButton = document.querySelector("#login-button");
    const ResetButton = document.querySelector("#Reset-button");
    const idMain=getCookie("agentmultiagentwebide")
    const idTokenMain=getCookie("agentmultiagentwebtky")
    console.log(idMain,idTokenMain)
    const ConfirmPassword = document.querySelector("input[id='Confirm-Password-Signup']").value;
    //console.log(signUpButton.id,logInButton.id,ResetButton.id)

    // Add click event listener to the login button
    if(signUpButton!=null&&signUpButton!=undefined){
    signUpButton.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent the form from submitting

        // Get the values of email and password fields
        const fullName = document.querySelector("input[id='Full-Name-Signup']").value;
        const email = document.querySelector("input[id='Email-Signup']").value;
        const password = document.querySelector("input[id='Password-Signup']").value;

        // Log the values to the console (you can replace this with your login logic)
        console.log("Email:", email);
        console.log("Password:", password);

        // Simulate login action
        if (!(email && password&&fullName&&ConfirmPassword)) {
          
          //action(email,password);
          showElementById("warningDialog")
          setInputValueById("error-message","All the fields should not be empty")
          
        } 
        if (email && fullName && (password==ConfirmPassword)) {
          
          //action(email,password);
          action(email,password,fullName);
          showElementById("loader")
          
        } 
        if (password!=ConfirmPassword) {
          showElementById("warningDialog")
          setInputValueById("error-message","Confirm password is not the same as the password") 
        } 
        else {
            alert("Please fill in both fields.");
        }
    })};

  if(logInButton!=null&&logInButton!=undefined){
    // Add click event listener to the login button
  logInButton.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent the form from submitting

  // Get the values of email and password fields
  const email = document.querySelector("input[id='Email-Signup']").value;
  const password = document.querySelector("input[id='Password-Signup']").value;

  // Log the values to the console (you can replace this with your login logic)
  console.log("Email:", email);
  console.log("Password:", password);

  // Simulate login action
  if (email && password) {
    console.log("testPage")
    //action(email,password);
    signInUser(email,password);
    
  } else {
      alert("Please fill in both fields.");
  }
})};

if(ResetButton!=null&&ResetButton!=undefined){
  // Add click event listener to the login button
  ResetButton.addEventListener("click", (event) => {
  event.preventDefault(); // Prevent the form from submitting

// Get the values of email and password fields
const email = document.querySelector("input[id='Email-Reset']").value;

// Log the values to the console (you can replace this with your login logic)
console.log("Email:", email);

// Simulate login action
if (email) {
  console.log("testPage")
  //action(email,password);
  ResetPassword(email);
  
} else {
    alert("Please fill in both fields.");
}
})};
});





 // Convert makeRequest to async function
async function makeRequest(url, method, data) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr.responseText);
      } else {
        reject(new Error(`HTTP Error: ${xhr.statusText}`));
      }
    };

    xhr.onerror = function () {
      reject(new Error("Network Error"));
    };

    xhr.send(JSON.stringify(data));
  });
}

// Usage with async/await
async function useMakeRequest(email,password,name) {
  try {
    const response = await makeRequest("http://127.0.0.1:8000/signup", "POST", {
      "email": email,
      "password": password,
      "name": name,
      "accessToken": "emptyYes",
      "isOnline": true,
      "dateOfBirth": "12-12-12"
    });
    //console.log(response); // Process the response as needed
    return response; // Return the response if needed for further handling
  } catch (error) {
    //console.error("Error:", error); // Handle the error
    throw error; // Rethrow the error if you want to propagate it
  }
}


//call signup action
async function action(email,password,fullname){
  
  result=await useMakeRequest(email, password,fullname)
  jsonResult=JSON.parse(result);
  console.log(jsonResult);
  if (jsonResult.status==="200 ok"){
    console.log("200 Ok")
      hideElementById("loader")
      window.location.href = "https://multiagentbase-pro-93abd0.webflow.io/dashboard";
}
else{
  error=jsonResult.data.message;
  console.log(error);
  console.log(jsonResult);
  hideElementById("loader")
  
  showElementById("warningDialog")
  setInputValueById("error-message",error)

}
}

  // Wrap XMLHttpRequest in a Promise to use with async/await
  function sendRequest(data) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "http://127.0.0.1:8000/signupanonymous", true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.withCredentials = false;
  
      // When request is complete
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(xhr.responseText); // resolve on success
          } else {
            reject(`Error: ${xhr.status} - ${xhr.statusText}`); // reject on error
          }
        }
      };
  
      // Send the data
      xhr.send(data);
    });
  }


async function CreateUserAnonymous(email){
  const data = JSON.stringify({
    "email": "anonymous34@gmail.com",
    "password": "12345",
    "name": "anonymous",
    "accessToken": "emptyYes",
    "isOnline": true,
    "dateOfBirth": "12-12-12"
  });
  try {
    myDATA = await sendRequest(data);
    DataJson=JSON.parse(myDATA);
    console.log(DataJson.fields);
    setCookie("agentmultiagentwebtky",DataJson.fields.refreshToken.stringValue,3)
    setCookie("agentmultiagentwebide",DataJson.fields.uuid.stringValue,3) // Await the response from sendRequest
    return(myDATA); // Output the response
  } catch (error) {
    return("Request failed:", error); // Handle errors
  }
}

// Prepare the data for the request

// Function to send the request
function sendRequest(data) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://127.0.0.1:8000/signin", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.withCredentials = false;

    // Handle state changes
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(xhr.responseText); // Resolve on success
        } else {
          reject(`Error: ${xhr.status} - ${xhr.statusText}`); // Reject on error
        }
      }
    };

    // Send the request with the data
    xhr.send(data);
  });
}

// Function to use async/await
async function signInUser(email,password) {
  const data = JSON.stringify({
    "email": email,
    "password": password
  });
  try {
    const response = await sendRequest(data);// Await the promise from sendRequest
    let JsonResponse=JSON.parse(response)
    let accessToken=JsonResponse.idToken
    console.log(accessToken)
    if(accessToken!=null&&accessToken!=undefined)
    {
      singleUser("users","email",email,accessToken)
    }
    //setCookie("agentmultiagentwebide",JsonResponse.fields.uuid.stringValue,3)
    console.log(JsonResponse); // Log the response on success
  } catch (error) {
    console.error("Request failed:", error); // Log errors
  }
}


async function getUser(table,query,value,token) {
  var data = JSON.stringify({
    "tablename": table,
    "queryfield": query,
    "queryvalue": value,
    "refreshToken": token
  });

  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener("readystatechange", function() {
      if (this.readyState === 4) {
        if (this.status >= 200 && this.status < 300) {
          resolve(this.responseText);
        } else {
          reject(new Error(`Request failed with status ${this.status}: ${this.statusText}`));
        }
      }
    });

    xhr.open("POST", "http://127.0.0.1:8000/getsingleuserdata");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(data);
  });
}

async function singleUser(table,query,value,token){
  try {
    const response = await getUser(table,query,value,token);
    let JsonResponse=JSON.parse(response)
    console.log("test",JsonResponse);
    let theToken=JsonResponse.data[0].document.fields.refreshToken.stringValue
    let uniqueId=JsonResponse.data[0].document.fields.uuid.stringValue
    setCookie("agentmultiagentwebtky",theToken,3)
    setCookie("agentmultiagentwebide",uniqueId,3)
    console.log("200 Ok")
    window.location.href = "https://multiagentbase-pro-93abd0.webflow.io/dashboard";
    
  } catch (error) {
    console.log(error);
  }
}

async function ResetPassword (email) {
  const data = JSON.stringify({
    userEmail: email
  });

  const url = "http://127.0.0.1:8000/resetpassword";

  const xhrRequest = () => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.withCredentials = false;

      xhr.open("POST", url);
      xhr.setRequestHeader("Content-Type", "application/json");

      xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr.responseText);
        } else {
          reject(new Error(`Request failed with status ${xhr.status}: ${xhr.statusText}`));
        }
      };

      xhr.onerror = function () {
        reject(new Error("Network error occurred"));
      };

      xhr.send(data);
    });
  };

  try {
    const response = await xhrRequest();
    console.log(response);
  } catch (error) {
    console.error("Error during the request:", error);
  }
};


console.log("page is loaded")
