<template>
  <div>
    <div :class="className" ref="chart" :style="styleObj"></div>
  </div>
</template>

<script>
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import { timezone } from '@/utils';

//* 라이센스 설정 항목
// am4core.addLicense('xxxxxxxx');
//* 워터마크 제거
am4core.options.commercialLicense = true;

//! 애니메이션 및 테마 사용시 성능 저하
//! import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import am4themes_kelly from '@amcharts/amcharts4/themes/kelly';
//! import am4themes_animated from '@amcharts/amcharts4/themes/animated';

//* Apply chart themes
//! am4core.useTheme(am4themes_animated);
!am4core.useTheme(am4themes_kelly);
//! am4core.useTheme(am4themes_animated);

am4core.options.queue = false;
am4core.options.onlyShowOnViewport = false;

export default {
  props: {
    data: {
      type: Array,
      required: true,
    },
    options: {
      type: Object,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    width: {
      type: String,
      required: false,
      default: '',
    },
    height: {
      type: String,
      required: false,
      default: '',
    },
    time: {
      type: Number,
      required: false,
      default: 0,
    },
    className: {
      type: String,
      required: false,
      default: 'graphwrap',
    },
  },
  data() {
    return {
      views: {
        spinner: false,
      },
      chart: null,
      types: {
        XY: 'getXYChart',
        GAUGE: 'getSolidGaugeChart',
        MULTIPLEVALUE: 'getMultipleValueChart',
        DATASORT: 'getDataSortChart',
        SORTBAR: 'getSortBarChart',
      },
      styleObj: {
        width: `${this.width}px`,
        height: `${this.height}px`,
      },
      colorList: ['#89D6ED', '#FF7071', '#4F83F5', '#886BE1'],
    };
  },
  computed: {
    setChart() {
      return this[this.types[this.type]]();
    },
  },
  mounted() {
    this.chartMount();
  },
  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose();
    }
  },
  watch: {
    data: function() {
      this.views.spinner = true;
      this.chartMount();
    },
  },
  methods: {
    chartMount() {
      if (this.chart) {
        this.chart.dispose();
      }
      this.styleObj = {
        width: `${this.width}px`,
        height: `${this.height}px`,
      };
      this.chart = this.setChart;
      this.$emit('chartData', this.chart);
    },
    getDataSortChart() {
      const chart = am4core.create(this.$refs.chart, am4charts.XYChart);

      chart.data = this.data;

      chart.padding(20, 20, 20, 20);

      const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.renderer.labels.template.rotation = 45;
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.dataFields.category = this.options.category;
      categoryAxis.renderer.minGridDistance = 60;
      categoryAxis.renderer.inversed = true;
      categoryAxis.renderer.grid.template.disabled = true;
      categoryAxis.cursorTooltipEnabled = false;
      const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.min = 0;
      valueAxis.extraMax = 0.1;
      //valueAxis.rangeChangeEasing = am4core.ease.linear;
      //valueAxis.rangeChangeDuration = 1500;
      valueAxis.cursorTooltipEnabled = false;

      const series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.categoryX = this.options.category;
      series.dataFields.valueY = this.options.valueY;
      series.tooltip.getFillFromObject = false;
      series.tooltip.background.fill = am4core.color('#000');
      series.tooltip.label.fill = am4core.color('#fff');
      series.tooltipText = '[font-size:12px]{valueY.value}[/]';
      series.columns.template.strokeOpacity = 0;
      series.columns.template.column.cornerRadiusTopRight = 10;
      series.columns.template.column.cornerRadiusTopLeft = 10;
      //series.interpolationDuration = 1500;
      //series.interpolationEasing = am4core.ease.linear;
      const labelBullet = series.bullets.push(new am4charts.LabelBullet());
      labelBullet.label.verticalCenter = 'bottom';
      labelBullet.label.dy = -10;
      // labelBullet.label.text =
      //   "{values.valueY.workingValue.formatNumber('#.')}";

      chart.zoomOutButton.disabled = true;

      if (this.options.multiY) {
        const paretoValueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        if (this.options.multiY) {
          paretoValueAxis.renderer.opposite = true;
          paretoValueAxis.min = 0;
          paretoValueAxis.max = 100;
          paretoValueAxis.strictMinMax = true;
          paretoValueAxis.renderer.grid.template.disabled = true;
          paretoValueAxis.numberFormatter = new am4core.NumberFormatter();
          paretoValueAxis.numberFormatter.numberFormat = "#'%'";
          paretoValueAxis.cursorTooltipEnabled = false;
        }
        const paretoSeries = chart.series.push(new am4charts.LineSeries());
        paretoSeries.dataFields.valueY = 'pareto';
        paretoSeries.dataFields.categoryX = this.options.category;
        paretoSeries.yAxis = paretoValueAxis;
        paretoSeries.tooltipText =
          "[font-size:12px]{valueY.formatNumber('#.0')}%[/]";
        paretoSeries.bullets.push(new am4charts.CircleBullet());
        paretoSeries.strokeWidth = 2;
        paretoSeries.stroke = am4core.color(this.colorList[1]);
        paretoSeries.fill = am4core.color(this.colorList[1]);
        const bullet = paretoSeries.bullets.push(new am4charts.CircleBullet());
        bullet.circle.strokeWidth = 1;
        bullet.circle.radius = 4;
        if (this.colorList[1])
          bullet.circle.fill = am4core.color(this.colorList[1]);
        paretoSeries.tooltip.getFillFromObject = false;
        paretoSeries.tooltip.background.fill = am4core.color('#000');
        paretoSeries.tooltip.label.fill = am4core.color('#fff');
        paretoSeries.strokeOpacity = 0.5;
      }
      // as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
      series.columns.template.adapter.add('fill', (fill, target) => {
        if (this.colorList[target.dataItem.index])
          return am4core.color(this.colorList[target.dataItem.index]);
        else return chart.colors.getIndex(target.dataItem.index);
      });

      if (this.options.cursor) chart.cursor = new am4charts.XYCursor();

      chart.fontSize = '12px';

      return chart;
    },
    getSolidGaugeChart() {
      // Create chart instance
      const chart = am4core.create(this.$refs.chart, am4charts.RadarChart);

      // Add data
      chart.data = this.data;

      // Make chart not full circle
      chart.startAngle = -90;
      chart.endAngle = 180;
      chart.innerRadius = am4core.percent(20);

      // Set number format
      chart.numberFormatter.numberFormat = "#.#'%'";

      // Create axes
      const categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = 'category';
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.grid.template.strokeOpacity = 0;
      categoryAxis.renderer.labels.template.horizontalCenter = 'right';
      categoryAxis.renderer.labels.template.fontWeight = 600;
      categoryAxis.renderer.labels.template.adapter.add('fill', function(
        fill,
        target,
      ) {
        return target.dataItem.index >= 0
          ? chart.colors.getIndex(target.dataItem.index)
          : fill;
      });
      categoryAxis.renderer.minGridDistance = 10;

      const valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
      valueAxis.renderer.grid.template.strokeOpacity = 0;
      valueAxis.min = 0;
      valueAxis.max = 120;
      valueAxis.strictMinMax = true;

      // Create series
      const series1 = chart.series.push(new am4charts.RadarColumnSeries());
      series1.dataFields.valueX = 'full';
      series1.dataFields.categoryY = 'category';
      series1.clustered = false;
      series1.columns.template.fill = new am4core.InterfaceColorSet().getFor(
        'alternativeBackground',
      );
      series1.columns.template.fillOpacity = 0.08;
      series1.columns.template.cornerRadiusTopLeft = 10;
      series1.columns.template.strokeWidth = 0;
      series1.columns.template.radarColumn.cornerRadius = 10;

      const series2 = chart.series.push(new am4charts.RadarColumnSeries());
      series2.dataFields.valueX = 'value';
      series2.dataFields.categoryY = 'category';
      series2.clustered = false;
      series2.columns.template.strokeWidth = 0;
      series2.columns.template.tooltipText =
        '[font-size:15px]{category} : {value}[/]';
      series2.columns.template.radarColumn.cornerRadius = 10;

      series2.columns.template.adapter.add('fill', function(fill, target) {
        const value = chart.data[target.dataItem.index].value;
        const code =
          value >= 110
            ? '#637edb'
            : value >= 90
            ? '#388c42'
            : value >= 80
            ? '#ff8f00'
            : '#dc4748';
        return am4core.color(code);
        // return chart.colors.getIndex(target.dataItem.index);
      });

      // Add cursor
      chart.cursor = new am4charts.RadarCursor();

      chart.fontSize = '11px';
      return chart;
    },
    getSortBarChart() {
      const chart = am4core.create(this.$refs.chart, am4charts.XYChart);
      chart.padding(0, 40, 0, 40);
      const categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.dataFields.category = this.options.valueY;
      categoryAxis.renderer.minGridDistance = 1;
      categoryAxis.renderer.inversed = true;
      categoryAxis.renderer.grid.template.disabled = true;

      const valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
      valueAxis.renderer.opposite = true;
      valueAxis.min = 0;

      const series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.categoryY = this.options.valueY;
      series.dataFields.valueX = this.options.valueX;
      series.tooltipText = '{valueX.value}';
      series.columns.template.strokeOpacity = 0;
      series.columns.template.column.cornerRadiusBottomRight = 5;
      series.columns.template.column.cornerRadiusTopRight = 5;

      const labelBullet = series.bullets.push(new am4charts.LabelBullet());
      labelBullet.label.horizontalCenter = 'left';
      labelBullet.label.dx = 10;
      labelBullet.label.text = '{valueX.value}';
      labelBullet.locationX = 1;

      // as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
      // series.columns.template.adapter.add('fill', function(fill, target) {
      //   return chart.colors.getIndex(target.dataItem.index);
      // });

      categoryAxis.sortBySeries = series;

      chart.fontSize = '12px';
      chart.data = this.data;
    },
    getXYChart() {
      //* Create chart instance
      const chart = am4core.create(this.$refs.chart, am4charts.XYChart);
      const data = this.data.map(item => {
        const obj = { ...item };
        const keys = [];
        const date =
          item[this.options.category].length > 2
            ? item[this.options.category]
            : `${new Date().getFullYear()}-${item[this.options.category]}`;
        const currentDate =
          date >= timezone.convertToClientTimeZone(new Date(), 'YYYY-MM');
        if (currentDate)
          Object.entries(item).map(([key, value]) => {
            if (value === null || value === '') {
              keys.push(key);
            }
          });
        keys.forEach(key => {
          obj[key] = undefined;
        });
        return obj;
      });

      chart.data = data;

      //* Create axes
      const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = this.options.category;
      if (this.options.hiddenX) categoryAxis.fontSize = '0px';
      categoryAxis.renderer.minGridDistance = this.options.minGridDistance;
      categoryAxis.renderer.labels.template.rotation = 45;
      categoryAxis.renderer.grid.template.stroke = am4core.color(
        'rgba(0,0,0,0.4)',
      );
      categoryAxis.cursorTooltipEnabled = false;
      if (this.options.titleX !== '')
        categoryAxis.title.text = this.options.titleX;

      const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.strictMinMax = true;
      if (this.options.titleY !== '')
        valueAxis.title.text = this.options.titleY;
      chart.fontSize = '12px';
      valueAxis.tooltip.disabled = true;
      valueAxis.cursorTooltipEnabled = false;
      valueAxis.renderer.minGridDistance = 25;
      valueAxis.extraMax = 0.2;
      valueAxis.extraMin = 0.1;
      valueAxis.renderer.grid.template.stroke = am4core.color(
        'rgba(0,0,0,0.4)',
      );
      // const items = [];
      //* Create series
      if (this.options.columnSeries) {
        for (const value of this.options.columnSeries) {
          const series = chart.series.push(new am4charts.ColumnSeries());
          series.dataFields.categoryX = this.options.category;
          series.dataFields.valueY = value.valueY;
          series.name = value.name;
          series.stacked = this.options.stacked;

          if (value.multiY) {
            series.columns.template.fill = am4core.color('#0984e3');
            series.columns.template.stroke = am4core.color('#0984e3');
            const paretoValueAxis = chart.yAxes.push(new am4charts.ValueAxis());

            if (value.valueAxes) {
              paretoValueAxis.min = value.min;
              paretoValueAxis.max = value.max;
              paretoValueAxis.strictMinMax = true;
            }
            paretoValueAxis.renderer.opposite = true;
            paretoValueAxis.renderer.grid.template.disabled = true;
            paretoValueAxis.numberFormatter = new am4core.NumberFormatter();
            if (value.multiyFormat)
              paretoValueAxis.numberFormatter.numberFormat = `#'${value.multiyFormat}'`;
            paretoValueAxis.cursorTooltipEnabled = false;
            series.yAxis = paretoValueAxis;
          }
          const item = {
            icon: '■',
            name: value.name,
            value: value.valueY,
            color: series.stroke.hex,
            unit: value.unit ? value.unit : '',
          };
          if (this.options.columnSeries) {
            // if ( !this.options.lineSeries || this.options.lineSeries.length === 0
            // ) {
            // const header = `<div>{categoryX}</div>`;
            // const page = Math.ceil(items.length / 5);
            let tooltip = '';
            let maxLeng = 0;
            // items.forEach(item => {
            const name = item.name;
            const leng = `${name}: ${item.value}${item.unit}`.length;
            maxLeng = maxLeng > leng ? maxLeng : leng;
            tooltip += `<div>
                  <span style="color:${item.color};">${item.icon}</span>${name}: {${item.value}}${item.unit}
                </div>`;
            // });
            // width: ${page * (maxLeng * 8)}px;
            // height: ${items.length > 5 ? '120' : items.length * 20}px;
            const mainStyle = `
              display: flex;
              flex-direction: column;
              flex-wrap: wrap;
              font-size: 14px;
              font-weight: 500;
            `;
            series.tooltipHTML = `
              <div style="${mainStyle}">
                ${tooltip}
              </div>`;
            series.tooltip.getFillFromObject = false;
            series.tooltip.background.fill = am4core.color(
              'rgba(0, 0, 0, 0.75)',
            );
            series.tooltip.label.fill = am4core.color('#fff');
            series.tooltip.pointerOrientation = this.options.pointerOrientation
              ? this.options.pointerOrientation
              : 'horizontal';
          }
        }
      }
      if (this.options.lineSeries) {
        for (const value of this.options.lineSeries) {
          const series = chart.series.push(new am4charts.LineSeries());
          series.tensionX = 0.8;
          series.dataFields.categoryX = this.options.category;
          series.dataFields.valueY = value.valueY;
          series.name = value.name;
          series.strokeWidth = 1;

          if (value.multiY) {
            const paretoValueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            paretoValueAxis.renderer.minGridDistance = 25;
            paretoValueAxis.extraMax = 0.2;
            paretoValueAxis.extraMin = 0.1;
            if (value.valueAxes) {
              paretoValueAxis.min = value.min;
              paretoValueAxis.max = value.max;
              paretoValueAxis.strictMinMax = true;
            }
            paretoValueAxis.renderer.opposite = true;
            paretoValueAxis.renderer.grid.template.disabled = true;
            paretoValueAxis.numberFormatter = new am4core.NumberFormatter();
            if (value.multiyFormat)
              paretoValueAxis.numberFormatter.numberFormat = `#'${value.multiyFormat}'`;
            paretoValueAxis.cursorTooltipEnabled = false;
            series.yAxis = paretoValueAxis;

            const bullet = series.bullets.push(new am4charts.Bullet());
            bullet.width = 8;
            bullet.height = 8;
            bullet.horizontalCenter = 'middle';
            bullet.verticalCenter = 'middle';
            bullet.strokeWidth = 1;
            bullet.stroke = am4core.color('#000');
            bullet.fill = am4core.color('#abd0bc'); //e8fdb7
            series.stroke = am4core.color('#abd0bc'); //e8fdb7

            const rectangle = bullet.createChild(am4core.Rectangle);
            rectangle.strokeWidth = 1;
            rectangle.width = 9;
            rectangle.height = 9;
          } else {
            const bullet = series.bullets.push(new am4charts.CircleBullet());
            bullet.circle.strokeWidth = 1;
            bullet.circle.radius = 4;
          }
          const item = {
            icon: value.multiY ? '■' : '●',
            name: value.name,
            value: value.valueY,
            color: series.stroke.hex,
            unit: value.unit ? value.unit : '',
          };
          // if (this.options.lineSeries.length - 1 === Number(idx)) {
          // const header = `<div>{categoryX}</div>`;
          // const page = Math.ceil(items.length / 5);
          let tooltip = '';
          let maxLeng = 0;
          // items.forEach(item => {
          const name = item.name;
          const leng = `${name}: ${item.value}${item.unit}`.length;
          maxLeng = maxLeng > leng ? maxLeng : leng;
          tooltip += `<div>
                  <span style="color:${item.color};">${item.icon}</span>${name}: {${item.value}}${item.unit}
                </div>`;
          // });
          // width: ${page * (maxLeng * 8)}px;
          // height: ${items.length > 5 ? '120' : items.length * 20}px;
          const mainStyle = `
              display: flex;
              flex-direction: column;
              flex-wrap: wrap;
              font-size: 14px;
              font-weight: 500;
            `;
          series.tooltipHTML = `
              <div style="${mainStyle}">
                ${tooltip}
              </div>`;
          series.tooltip.getFillFromObject = false;
          series.tooltip.background.fill = am4core.color('rgba(0, 0, 0, 0.75)');
          series.tooltip.label.fill = am4core.color('#fff');
          series.tooltip.pointerOrientation = this.options.pointerOrientation
            ? this.options.pointerOrientation
            : 'horizontal';
          // }
        }
      }
      //* Add legend
      if (this.options.legend) {
        chart.legend = new am4charts.Legend();
        chart.legend.maxWidth = undefined;

        if (this.options.legendPosition === 'right') {
          chart.legend.position = 'right';
          chart.legend.valign = 'bottom';
          chart.height = am4core.percent(120);
          chart.width = am4core.percent(95);
          chart.legend.margin(0, 0, 25, 0);
          if (this.options.labels) {
            let label = chart.createChild(am4core.Label);
            label.text = this.options.labels;
            label.fontSize = 12;
            label.isMeasured = false;
            label.x = am4core.percent(87);
            // label.horizontalCenter = 'middle';
            label.y = am4core.percent(0);
          }
        } else if (this.options.legendPosition === 'left') {
          chart.legend.position = 'left';
          chart.legend.valign = 'top';
        } else if (this.options.legendPosition === 'bottom') {
          chart.legend.position = 'bottom';
          chart.legend.valign = 'top';
        } else if (this.options.legendPosition === 'top') {
          chart.legend.position = 'top';
          chart.legend.valign = 'top';
        } else if (this.options.legendPosition === 'absolute') {
          chart.legend.position = 'absolute';
          setTimeout(() => {
            chart.legend.parent = chart.tooltipContainer;
            chart.legend.x = 200;
            chart.legend.y = 0;
          }, 1);
        }

        if (this.options.contentAlign) {
          chart.legend.contentAlign = this.options.contentAlign;
          if (chart.legend.contentAlign === 'right') {
            if (this.options.labels) {
              let label = chart.createChild(am4core.Label);
              label.text = this.options.labels;
              label.fontSize = 12;
              label.isMeasured = false;
              label.x = am4core.percent(0);
              // label.horizontalCenter = 'middle';
              label.y = am4core.percent(94);
            }
          }
        }

        const markerTemplate = chart.legend.markers.template;
        markerTemplate.width = 10;
        markerTemplate.height = 10;
        chart.legend.fontSize = 11;
      }

      //* Add cursor
      if (this.options.cursor) {
        chart.cursor = new am4charts.XYCursor();
      }
      //* Add simple vertical scrollbar
      if (this.options.scrollBarY) chart.scrollbarY = new am4core.Scrollbar();

      //* Add horizotal scrollbar with preview
      if (this.options.scrollBarX) {
        const scrollbarX = new am4charts.XYChartScrollbar();
        //* scrollbarX.series.push(series);
        chart.scrollbarX = scrollbarX;
      }

      return chart;
    },
  },
};
</script>

<style scoped>
.graphwrap {
  padding: 0 !important;
  margin: 0 !important;
}
</style>
