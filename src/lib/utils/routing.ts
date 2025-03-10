import { LoaderFunctionArgs, redirect } from "react-router-dom";

export const validatePageParam = ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const page = Number(searchParams.get("page"));
  if (!page || page < 1) {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", "1");
    return redirect(`/todos?${newParams.toString()}`);
  }
  return null;
};
