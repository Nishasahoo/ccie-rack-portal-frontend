import countries from "i18n-iso-countries";
import en from "i18n-iso-countries/langs/en.json";
import moment from "moment-timezone";

countries.registerLocale(en);

// Get sorted country list
export const COUNTRY_LIST = Object.entries(
  countries.getNames("en", { select: "official" })
)
  .map(([code, name]) => ({ code, name }))
  .sort((a, b) => a.name.localeCompare(b.name));

// Get all timezones with GMT offset
export const TIMEZONES = moment.tz.names().map((tz) => {
  const offset = moment.tz(tz).utcOffset();
  const sign = offset >= 0 ? "+" : "-";
  const hours = String(Math.floor(Math.abs(offset) / 60)).padStart(2, "0");
  const mins = String(Math.abs(offset) % 60).padStart(2, "0");

  return {
    value: tz,
    label: `GMT${sign}${hours}:${mins} — ${tz}`,
  };
});
