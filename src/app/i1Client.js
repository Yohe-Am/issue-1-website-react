import { NewIssue1Client } from "issue-1-client-js";

const baseURL = "http://localhost:8080";

var client = NewIssue1Client(baseURL);

function ReInitializeClient({ baseURL = '', newClient }) {
    if (newClient) {
        client = newClient;
    } else if (baseURL) {
        client = NewIssue1Client(baseURL);
    } else {
        client = NewIssue1Client(baseURL);
    }
}

export { ReInitializeClient }

export default client;

/*
const clientSlice = createSlice({
    name: 'client',
    initialState: {
        ...NewIssue1Client(baseURL)
    },
}); */