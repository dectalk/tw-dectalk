(function(Scratch){
	const prefix = "https://raw.githubusercontent.com/NishiOwO/tw-dectalk/refs/heads/master";

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
				const wasm = await fetch(prefix + "/dtc.wasm");

				var Module = {
					wamsBinary: wasm.arrayBuffer(),
					onRuntimeInitialized: async function(){
						console.log("DECtalk loaded");
					}
				};

				const script = document.createElement("script");
				script.src = prefix + "/dtc.js";
				document.body.appendChild(script);
			});
		}
	};

	Scrath.extensions.register(new DECtalk());
})(Scratch);
