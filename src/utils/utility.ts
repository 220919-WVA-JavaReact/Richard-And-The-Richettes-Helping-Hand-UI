





export default async function HHAPI(route: string, method: string) {
    try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}${route}`, {
            method: method,
        });

        if (res.status !== 200) {
            console.log('could not connect');
        } else {
            const result = await res.json();
            return result;
        }

    } catch (err) {
        console.log('There was an error communicating with the API.');
    }
}
