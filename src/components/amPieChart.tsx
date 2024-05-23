import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import React, {useMemo} from 'react';
import WebView from 'react-native-webview';
import colors from '../constants/color';
import {Constants} from '../constants/constants';
import appStyle from '../styles/appStyle';
import {AmPieChartProps} from '../interfaces/componentsInterface/componentInterfaces';

const AMPiechart = ({data, licenseKey}: AmPieChartProps) => {
  const renderWebView = useMemo(() => {
    const tempData = JSON.stringify(data);
    const html = `<html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1 " />
    <style>
    #chartdiv {
      width:100%;
      height:100%;
    }
    .amcharts-export-menu-top-right {
      right: 0;
    }
    text{
      font-size:12px;
      font-family: museo-sans, sans-serif;
    }
    .span{
      font-size:12px;
      font-family: museo-sans, sans-serif;
    }
    </style>
    </head>

    <!-- Resources -->
     <script src="https://cdn.amcharts.com/lib/4/core.js"></script>
     <script src="https://cdn.amcharts.com/lib/4/charts.js"></script>
     <script src="https://cdn.amcharts.com/lib/4/themes/animated.js"></script>

    
    <!-- Chart code -->
    <script>

    am4core.ready(function() {

        // Themes begin
        am4core.useTheme(am4themes_animated);
        am4core.addLicense("${licenseKey}")
        // Themes end
        
        // Create chart instance
        var chart = am4core.create("chartdiv", am4charts.PieChart);
        
        
// Add data
chart.data = ${tempData}

// chart.radius = am4core.percent(95);
chart.paddingTop = 0;
chart.paddingRight = 0;
chart.paddingBottom = 10;
chart.paddingLeft = 0;

// Add and configure Series
var pieSeries = chart.series.push(new am4charts.PieSeries());
pieSeries.dataFields.value = "num_user_attempts";
pieSeries.dataFields.category = "label";
pieSeries.slices.template.stroke = am4core.color("#fff");
pieSeries.slices.template.strokeOpacity = 1;
pieSeries.slices.template.tooltipText = "{category} {value.percent.formatNumber('#.#')}%"

pieSeries.tooltip.getFillFromObject = false;
pieSeries.tooltip.background.fill = am4core.color("#000000");


// This creates initial animation
pieSeries.hiddenState.properties.opacity = 1;
pieSeries.hiddenState.properties.endAngle = -90;
pieSeries.hiddenState.properties.startAngle = -90;
pieSeries.ticks.template.disabled = true;
pieSeries.labels.template.disabled = true;
var colorSet = new am4core.ColorSet();
colorSet.list = ["#8AC34A", "#FFC107", "#2196F3", "#F2473A", "#494949","#A0A0A0"].map(function(color) {
  return new am4core.color(color);
});
pieSeries.colors = colorSet;
chart.hiddenState.properties.radius = am4core.percent(0);

chart.legend = new am4charts.Legend();
chart.legend.labels.template.text="{reason}"
chart.legend.valueLabels.template.disabled = true;
// chart.legend.itemContainers.template.clickable = false;
// chart.legend.itemContainers.template.focusable = false;
chart.legend.labels.template.fill = am4core.color('${colors.black}')

chart.legend.valign = "bottom"
// chart.legend.layout = "vertical";
chart.legend.contentAlign = "left";
var markerTemplate = chart.legend.markers.template;
markerTemplate.width = 15;
markerTemplate.height = 15;
       
        });
    </script>
    
    <!-- HTML -->
    <div id="chartdiv" style="background-color:${colors.white}"></div>
    </html>`;

    return (
      <WebView
        nestedScrollEnabled={false}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        scalesPageToFit={true}
        overScrollMode="never"
        style={{
          width: Constants.deviceWidth,
          height: '100%',
          opacity: 0.99,
          backgroundColor: 'transparent',
        }}
        injectedJavaScript={`document.body.style.userSelect = 'none'`}
        startInLoadingState={true}
        renderLoading={() => {
          return <ActivityIndicator size={'small'} color={colors.black} />;
        }}
        source={{
          html: html,
        }}
      />
    );
  }, []);

  return data?.length > 0 ? (
    <View
      style={{
        width: Constants.deviceWidth,
        height: 500,
      }}>
      {renderWebView}
    </View>
  ) : (
    <View style={[styles.emptyGraphStyle, {borderColor: colors._BBBBBB}]}>
      <Text style={[appStyle.emptyTextStyle, {color: colors.black}]}>
        No Data
      </Text>
    </View>
  );
};

export default AMPiechart;

const styles = StyleSheet.create({
  emptyGraphStyle: {
    width: 300,
    height: 300,
    borderRadius: 300 / 2,
    marginVertical: 20,
    borderWidth: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
