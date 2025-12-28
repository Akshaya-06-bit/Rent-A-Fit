import sys, json
import pandas as pd
from prophet import Prophet

orders_file = sys.argv[1]
with open(orders_file) as f:
    orders = json.load(f)

df = pd.DataFrame(orders)
if df.empty:
    print(json.dumps([0]))
    sys.exit()

df['date'] = pd.to_datetime(df['date'])
df = df.groupby(df['date'].dt.to_period('M')).sum().reset_index()
df['date'] = df['date'].dt.to_timestamp()
df = df.rename(columns={'date':'ds', 'total':'y'})

model = Prophet(yearly_seasonality=False, weekly_seasonality=False, daily_seasonality=False)
model.fit(df)

future = model.make_future_dataframe(periods=1, freq='M')
forecast = model.predict(future)
predicted_next_month = round(forecast['yhat'].iloc[-1], 2)

print(json.dumps([predicted_next_month]))
