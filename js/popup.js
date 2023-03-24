// Get a reference to the toggle switch
const toggleSwitch = document.querySelector('#toppings-toggle');

// Listen for changes to the toggle switch
toggleSwitch.addEventListener('change', () => {
	// Send a message to the background script to toggle the extension on or off
	chrome.runtime.sendMessage({ type: 'toggle' });

	// Store the state of the toggle switch in local storage
	chrome.storage.local.set({ 'toppings-toggle': toggleSwitch.checked });
});

// Retrieve the state of the toggle switch from local storage
chrome.storage.local.get('toppings-toggle', (data) => {
	// Set the state of the toggle switch to the stored value or "on" if no value is found
	toggleSwitch.checked =
		data['toppings-toggle'] !== undefined ? data['toppings-toggle'] : true;
});
