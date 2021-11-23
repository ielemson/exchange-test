
import { fetchCurrencyUsdBasedRates } from './util';

test('fetch api', async () => {
  const rates = await fetchCurrencyUsdBasedRates();
  expect(Object.values(rates).length).toBeGreaterThan(0)
});
