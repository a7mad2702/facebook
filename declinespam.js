// ---- decline spam
// you have to be admin on the group to run this script on your browser console
// 1- open your group spam ===> https://www.facebook.com/groups/PutHereGroupIDNumber/spam
// 2- open the browser console then copy and paste this script 
// 3- this will run every 3 minutes to finish deleting all spam posts

let scheduleMinutes = 3;
let timerId = 0;
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function cleanSpamPosts() {
  try {
    console.log("🧹 Starting :::decline spam:::...timerId:", timerId);
   
    const searchText = "Decline";

const matchingSpans = await Array.from(document.querySelectorAll('span')).filter(span => span.textContent.trim() === searchText);
    let index = 1;
let cnt = matchingSpans.length;
  for (let mnuBtn of matchingSpans) {
      console.log(`Processing ${index} of ${cnt}`); 
     await mnuBtn.click();
     await sleep(1000); 
     index++;
  }
} catch (error) {
    console.error("❌ Error processing posts:", error);
  } finally {
    
     window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: "smooth" });
    await sleep(2000);

    window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: "smooth" });
    await sleep(3000);
    // Schedule the next run only AFTER the current one completely finishes
    let milliseconds = 1000 * 60 * scheduleMinutes;
    timerId = setTimeout(cleanSpamPosts, scheduleMinutes); 
  }
}
cleanSpamPosts();
