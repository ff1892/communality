<script lang="ts">
  import type { PageProps } from './$types';

  let { data }: PageProps = $props();
  let { newerMetric, olderMetric, diff, rate, cost } = $derived(data);

  let date = $derived(
    new Date(newerMetric.checkedAt).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })
  );
  let electricityTotal = $derived(data.electricityTotal.toFixed(2));
  let waterTotal = $derived(data.waterTotal.toFixed(2));
  let total = $derived(data.total.toFixed(2));
</script>

<h1>Коммунальные услуги</h1>
<div>
  <h2>{date}</h2>
  <section>
    <h3>Показания счетчиков</h3>
    <ul>
      <li>Электричество Т1: {newerMetric.electricityT1}</li>
      <li>Электричество Т2: {newerMetric.electricityT2}</li>
      <li>Электричество Т3: {newerMetric.electricityT3}</li>
      <li>Холодная вода: {newerMetric.waterCold.toFixed(3)}</li>
      <li>Горячая вода: {newerMetric.waterHot.toFixed(3)}</li>
    </ul>
  </section>
  <section>
    <h3>Расчёты</h3>
    <ul>
      <li>
        <span>
          Электричество Т1: {newerMetric.electricityT1} - {olderMetric.electricityT1} = {diff.electricityT1}
        </span>
        <span>
          × {rate.electricityT1.toFixed(2)} = {cost.electricityT1.toFixed(2)} ₽
        </span>
      </li>
      <li>
        <span>
          Электричество Т2: {newerMetric.electricityT2} - {olderMetric.electricityT2} = {diff.electricityT2}
        </span>
        <span>
          × {rate.electricityT2.toFixed(2)} = {cost.electricityT2.toFixed(2)} ₽
        </span>
      </li>
      <li>
        <span>
          Электричество Т3: {newerMetric.electricityT3} - {olderMetric.electricityT3} = {diff.electricityT3}
        </span>
        <span>
          × {rate.electricityT3.toFixed(2)} = {cost.electricityT3.toFixed(2)} ₽
        </span>
      </li>
      <li>
        <span>
          Холодная вода: {newerMetric.waterCold.toFixed(3)} - {olderMetric.waterCold.toFixed(3)} = {diff.waterCold.toFixed(
            3
          )}
        </span>
        <span>
          × {rate.waterCold.toFixed(2)} = {cost.waterCold.toFixed(2)} ₽
        </span>
      </li>
      <li>
        <span>
          Горячая вода: {newerMetric.waterHot.toFixed(3)} - {olderMetric.waterHot.toFixed(3)} = {diff.waterHot.toFixed(
            3
          )}
        </span>
        <span>
          × {rate.waterHot.toFixed(2)} = {cost.waterHot.toFixed(2)} ₽
        </span>
      </li>
    </ul>
  </section>
  <section>
    <h3>Начисления</h3>
    <p>Итого за электричество: {electricityTotal} ₽</p>
    <p>Итого за воду: {waterTotal} ₽</p>
    <p>Итого за интернет: {cost.internet.toFixed(2)} ₽</p>
  </section>
  <h3>Общий итог: {total} ₽</h3>
</div>
