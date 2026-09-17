//remove published facebook posts -------------------------

// you have to be admin on the group ro run this script on your browser console
// 1- open your group spam ===> https://www.facebook.com/groups/PutHereGroupIDNumber/
// 2- open the brwoser console then copy and paste this script 
// 3- this will run every RANDOM minutes to finish deleting all published posts, (you can change the value of scheduleMinutes)


let maxMinutes =7;
let minMinutes= 3;


let maxSeconds =3;
let minSeconds= 1;
let randSeconds = 1;


let timerId = 0;
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function cleanPosts() {
  try {
    console.log("🧹 Starting :::remove published facebook posts:::...timerId:", timerId);

    var menuButtons = await document.querySelectorAll('[aria-label*="Actions for this post"]');
    let index = 1;
let cnt = menuButtons.length;
  for (let mnuBtn of menuButtons) {
      console.log(`Processing ${index} of ${cnt}`); 
     await mnuBtn.click();
     randSeconds = (Math.floor(Math.random() * (maxSeconds - minSeconds + 1)) + minSeconds)*1000;
     await sleep(randSeconds); 
    var deleteButton = await Array.from(document.querySelectorAll('span')).find(el => el.textContent === 'Remove post' || el.textContent === 'Delete post');
    if (deleteButton) {
        deleteButton.click();
        console.log('Remove clicked');
        randSeconds = (Math.floor(Math.random() * (maxSeconds - minSeconds + 1)) + minSeconds)*1000;
        await sleep(randSeconds); 
        var confirmButton = await Array.from(document.querySelectorAll('span')).find(el => el.textContent === 'Confirm' || el.textContent === 'Delete');
          if (confirmButton) {
            await confirmButton.click();
            console.log('Confirm clicked');
            randSeconds = (Math.floor(Math.random() * (maxSeconds - minSeconds + 1)) + minSeconds)*1000;
            await sleep(randSeconds); 
            var deleteBtnLastConfirm = await Array.from(document.querySelectorAll('span')).find(el => el.textContent === 'Confirm' || el.textContent === 'Delete');
          if (deleteBtnLastConfirm) 
            {
              await deleteBtnLastConfirm.click();
              randSeconds = (Math.floor(Math.random() * (maxSeconds - minSeconds + 1)) + minSeconds)*1000;
              await sleep(randSeconds); 
              console.log('Last Confirm clicked');
            }
             else{ console.log('No LastConfirm Button Found'); }
          }
           else{ console.log('No Confirm Button Found'); }
      }
      else{ console.log('No Remove Button Found'); }
      index++;
  }
    console.log("✅ Cleanup complete.");
  } catch (error) {
    console.error("❌ Error processing posts:", error);
  } finally {
    // Schedule the next run only AFTER the current one completely finishes
    window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: "smooth" });
    randSeconds = (Math.floor(Math.random() * (maxSeconds - minSeconds + 1)) + minSeconds)*1000;
    await sleep(randSeconds);

    window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: "smooth" });
    randSeconds = (Math.floor(Math.random() * (maxSeconds - minSeconds + 1)) + minSeconds)*1000;
    await sleep(randSeconds);

    let randMinutes = Math.floor(Math.random() * (maxMinutes - minMinutes + 1)) + minMinutes;

    console.log(`I'll run again after: ${randMinutes} of Minutes`);

    let milliseconds = 1000 * 60 * randMinutes;

    timerId = setTimeout(cleanPosts, milliseconds); 
  }
}

// Start the loop
cleanPosts();
