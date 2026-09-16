//remove published facebook posts -------------------------

// you have to be admin on the group ro run this script on your browser console
// 1- open your group spam ===> https://www.facebook.com/groups/PutHereGroupIDNumber/
// 2- open the brwoser console then copy and paste this script 
// 3- this will run every 6 seconds to finish deleting all published posts

let timerId = 0;
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function cleanPosts() {
  try {
    console.log("🧹 Starting :::remove published facebook posts:::...timerId:", timerId);

    window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: "smooth" });
    await sleep(2000);

    window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: "smooth" });
    await sleep(3000);

    var menuButtons = await document.querySelectorAll('[aria-label*="Actions for this post"]');
    let index = 1;
let cnt = menuButtons.length;
  for (let mnuBtn of menuButtons) {
      console.log(`Processing ${index} of ${cnt}`); 
     await mnuBtn.click();
     await sleep(1000); 
    var deleteButton = await Array.from(document.querySelectorAll('span')).find(el => el.textContent === 'Remove post' || el.textContent === 'Delete post');
    if (deleteButton) {
        deleteButton.click();
        console.log('Remove clicked');
        await sleep(1000); 
        var confirmButton = await Array.from(document.querySelectorAll('span')).find(el => el.textContent === 'Confirm' || el.textContent === 'Delete');
          if (confirmButton) {
            await confirmButton.click();
            console.log('Confirm clicked');
            await sleep(1000); 
            var deleteBtnLastConfirm = await Array.from(document.querySelectorAll('span')).find(el => el.textContent === 'Confirm' || el.textContent === 'Delete');
          if (deleteBtnLastConfirm) 
            {
              await deleteBtnLastConfirm.click();
              await sleep(1000); 
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
    timerId = setTimeout(cleanPosts, 60000); 
  }
}

// Start the loop
cleanPosts();
