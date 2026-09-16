// ---- decline spam
// you have to be admin on the group ro run this script on your browser console
// 1- open your group spam ===> https://www.facebook.com/groups/PutHereGroupIDNumber/spam
// 2- open the brwoser console then copy and paste this script 
// 3- this will run every 6 seconds to finish deleting all spam posts

let timerId = 0;
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function cleanSpamPosts() {
  try {
    console.log("🧹 Starting :::decline spam:::...timerId:", timerId);
    window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: "smooth" });
    await sleep(1000);
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
    // Schedule the next run only AFTER the current one completely finishes
    timerId = setTimeout(cleanSpamPosts, 60000); 
  }
}
cleanSpamPosts();
