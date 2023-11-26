import { format } from "date-fns";

function useFormattedDate(str, outputFormat = "yyyy-MM-dd HH:mm:ss") {
	if (!str) {
		return "";
	}

	return format(new Date(str), outputFormat);
}

export default useFormattedDate;