(function(Scratch){
	const prefix = "https://cdn.jsdelivr.net/gh/nishiowo/tw-dectalk";

	class DECtalk {
		getInfo() {
			return {
				id: "dectalk",
				name: "DECtalk",
				blocks: [
					{
						opcode: "speak",
						blockType: Scratch.BlockType.COMMAND,
						text: "Speak [TEXT]",
						arguments: {
							TEXT: {
								type: Scratch.ArgumentType.STRING
							}
						}
					}
				]
			};
		}

		speak(args) {
			return new Promoise(function (res, rej){
				fetch(prefix + "/dtc.wasm").then(function (wasm){
					var Module = {
						wamsBinary: wasm.arrayBuffer(),
						onRuntimeInitialized: async function(){
							console.log("DECtalk loaded");
						}
					};

					const script = document.createElement("script");
					script.src = prefix + "/dtc.js";
					document.body.appendChild(script);
				}).catch(function (){
					rej();
				});
			});
		}
	};

	Scratch.extensions.register(new DECtalk());
})(Scratch);
