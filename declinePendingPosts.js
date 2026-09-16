// ---- decline pending posts

// you have to be admin on the group to run this script on your browser console
// 1- open your group spam ===> https://www.facebook.com/groups/PutHereGroupIDNumber/pending_posts/
// 2- open the browser console then copy and paste this script 
// 3- this will run every 3 minutes to finish deleting all pending posts

let scheduleMinutes = 3;

let timerId = 0;
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function declinePosts() {
  try {
    console.log("🧹 Starting :::decline pending posts:::...timerId:", timerId);
  
    

const selectAll = await document.querySelectorAll('[aria-label*="Select all"]')[0];
if(selectAll){
      selectAll.click();
   }
await sleep(2000); 
var declineButton = Array.from(document.querySelectorAll('span')).find(el => el.textContent === 'Decline' );
if(declineButton){
    declineButton.click();
    await sleep(1000);
    var doneButton = Array.from(document.querySelectorAll('span')).find(el => el.textContent === 'Done' );
      if(doneButton)doneButton.click();

}
} catch (error) {
    console.error("❌ Error processing posts:", error);
  } finally {
    // Schedule the next run only AFTER the current one completely finishes
     window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: "smooth" });
    await sleep(2000);

    window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: "smooth" });
    await sleep(3000);

    let milliseconds = 1000 * 60 * scheduleMinutes;
    timerId = setTimeout(declinePosts, milliseconds); 
  }
}
declinePosts();
