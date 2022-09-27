/** @jsxImportSource solid-js */
import { createSignal, JSX } from 'solid-js';
import axios from "axios";

function isValidHttpUrl(string: string) {
    let url;

    try {
        url = new URL(string);
    } catch (_) {
        return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
}

export default function ShortenForm() {
    const [url, setURL] = createSignal("");
    const [error, setError] = createSignal("");
    const [returnMessage, setReturnMessage] = createSignal("");
    const ErrorMessage = (props: { error: string }) => <span class="error-message">{props.error}</span>;
    const sendURL = () => {
        if (isValidHttpUrl(url())) {
            axios.post("/api/shorten", {
                url: url()
            })
                .then((response) => {
                    console.log(response.data);
                    setReturnMessage(response.data);
                }).catch((error) => {
                    console.log(error);
                })
        } else {
            setError("Please enter a valid url including http:// or https://");
        }
    }
    return (<>
        <div class="flex flex-col max-w-sm mt-4">
            <h2 class="mb-2 text-2xl">Shorten URL</h2>
            <input type="url" id="urlInput" value={url()} placeholder="https://google.com" onChange={(e) => setURL(e.currentTarget.value)} class="bg-gradient-to-br from-stone-200 to-stone-300 text-stone-800 dark:from-stone-800 dark:to-stone-700 dark:text-stone-200 " />
            <button onClick={() => sendURL()} class="select-none cursor-pointer text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-4 mb-2">
                Submit
            </button>
            {error() !== "" && <ErrorMessage error={error()} />}
        </div>
    </>);
}