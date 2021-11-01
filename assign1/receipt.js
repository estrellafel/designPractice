$(document).ready( () => {

	function digits() {
		let result = "";
		let n = Math.random() * 3;
		for( let x = 0; x < n; x++ ) {
			result += Math.floor( Math.random() * 10 );
		}

		return result;
	}

	function bytes() {
		let n = Math.floor( Math.random() * 3 );
		if( n == 0 ) { 
			return "32G";
		} else if( n == 1 ) {
			return "64G";
		} else {
			return "128G";
		}
	}


	function prefix(length) {
		let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
	}

	function suffix() {
		if( Math.random() < .1 ) {
			return " with " + prefix() + choose(["super ", "pro ", "turbo "]) + choose([" drive", "bit", " channel"]);
		} else return "";
	}

	function end() {
		return choose( ["USB C", "USB B", "VGA", "HDMI", "Firewire", "USB C mini", "USB C micro", "DisplayPort"])
	}

	let items = [ () => 'VR Goggles', 
	              () => prefix(Math.random() * 7 + 1) + ' Gamepad ' + suffix(),
	              () => prefix(Math.random() * 7 + 1) + ' Mouse ' + suffix(),
	              () => prefix(Math.random() * 7 + 1) + ' Graphics Card', 
	              () => prefix(Math.random() * 7 + 1) + ' ' + end() + " to " + end() + " adapter",
	              () => prefix(Math.random() * 7 + 1) + ' Monitor', 
	              () => bytes() + ' RAM', 
	              () => bytes() + ' HDD'];

	function fixed( val ) {
		return (Math.round(val * 100) / 100).toFixed(2);
	}

	function price() {
		return fixed( Math.random() * 750 );
	}

	function choose(vals) {
		let i = Math.floor( Math.random() * vals.length);
		return vals[i];
	}

	function createItem() {
		return { price: price(), desc : choose(items)() };
	}

	function itemToHtml( item ) {
		return $(`<li><div class='item'><span>${item.desc}</span><span>${item.price}</span></div></li>`);
	}

	function createFooterForItems(items) {
		let subTotal = items.map( item => Number(item.price) ).reduce( (a,b)=>a+b, 0);
		let tax = subTotal * .0375;
		let total = subTotal + tax;
		return $(`<div class="receipt-footer"><div class="sub-total"><span>Sub Total:</span><span>${fixed(subTotal)}</span></div><div class="tax"><span>Tax:</span><span>${fixed(tax)}</span></div><div class="total"><span>Total:</span><span>${fixed(total)}</span></div>`);
	}

	function createReceipt() {
		let result = $('<div class="receipt"></div>');
		$("<h1>Receipt</h1>").appendTo(result);
		let list = $("<ul class='receipt-items'>");
		list.appendTo( result );
		let n = Math.random() * 20 + 1;
		let items = [];
		for( let i = 0; i < n; i++ ) {
			let item = createItem();
			items.push(item);
			let li = itemToHtml( item );
			$(li).appendTo(list);
		}


		createFooterForItems( items).appendTo( result );
		$('<div class="receipt-printer"></div>').appendTo( result );
		return result;
	}

	let n = Math.random() * 15 + 1;
	for( let i = 0; i < n; i++ ) {
		createReceipt().appendTo("body");
	}

});


