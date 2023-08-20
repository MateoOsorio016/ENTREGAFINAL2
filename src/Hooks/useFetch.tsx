import { useState, useEffect } from 'react';

export interface useFetchProps {
	url: string;
	method?: string;
	body?: any;
	headers?: any;
}

export const useFetch = ({
	url,
	method = 'GET',
	headers = {},
}: useFetchProps) => {
	const [data, setData] = useState<any>([]);
	const [error, setError] = useState<any>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [controller, setController] = useState<AbortController | null>(null);
	const [bodyRequest, setBodyRequest] = useState<any>(null);
    const [methodState, setMethodState] = useState<string>(method);
    const [urlState, setUrlState] = useState<string>(url);

	useEffect(() => {
		const abortController: any = new AbortController();
		setController(abortController);
		setLoading(true);
		if (method === 'GET') {
			fetch(urlState, {
				method,
				headers,
				signal: abortController.signal,
			})
				.then((response) => response.json())
				.then((data) => {
					setData(data);
					setError(null);
					setLoading(false);
				})
				.catch((error) => {
					if (error.name !== 'AbortError') {
						setError(error);
						setLoading(false);
					}
				})
				.finally(() => setLoading(false));
		} else if (method === 'POST' || method === 'PUT') {
			fetch(url, {
				method,
				body: JSON.stringify(bodyRequest),
				headers,
				signal: abortController.signal,
			})
				.then((response) => response.json())
				.then((data) => {
					console.log('esta aqui', data);
					setData(data);
					setError(null);
					setLoading(false);
				})
				.catch((error) => {
					if (error.name !== 'AbortError') {
						setError(error);
						setLoading(false);
					}
				})
				.finally(() => setLoading(false));
		}
		return () => abortController.abort();
	}, [urlState, bodyRequest, methodState]);

	const handleCancelRequest = () => {
		if (controller) {
			controller.abort();
			setError('Request aborted');
		}
	};

	return { data, error, loading, handleCancelRequest, setBodyRequest, setMethodState, setUrlState };
};
