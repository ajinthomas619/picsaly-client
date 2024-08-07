import React from "react";
import CanvasJS from "@canvasjs/charts";

class CanvasJSChart extends React.Component<any, any> {
  chart: any;
  options: any;
  containerProps: any;
  containerRef: React.RefObject<HTMLDivElement>;

  constructor(props: any) {
    super(props);
    this.options = props.options ? props.options : {};
    this.containerProps = props.containerProps ? { ...props.containerProps } : { width: "100%", position: "relative" };
    this.containerProps.height = props.containerProps && props.containerProps.height ? props.containerProps.height : this.options.height ? this.options.height + "px" : "400px";
    this.containerRef = React.createRef();
  }

  componentDidMount() {
    // Create Chart and Render
    this.chart = new CanvasJS.Chart(this.containerRef.current, this.options);
    this.chart.render();

    if (this.props.onRef) this.props.onRef(this.chart);
  }

  shouldComponentUpdate(nextProps: any) {
    // Check if Chart-options has changed and determine if component has to be updated
    return !(nextProps.options === this.options);
  }

  componentDidUpdate() {
    // Update Chart Options & Render
    this.chart.options = this.props.options;
    this.chart.render();
  }

  componentWillUnmount() {
    // Destroy chart and remove reference
    if (this.chart) this.chart.destroy();

    if (this.props.onRef) this.props.onRef(undefined);
  }

  render() {
    return <div id={this.props.id} ref={this.containerRef} style={this.containerProps} />;
  }
}

const CanvasJSReact = {
  CanvasJSChart: CanvasJSChart,
  CanvasJS: CanvasJS,
};

export default CanvasJSReact;
/*tslint:enable*/
/*eslint-enable*/
/*jshint ignore:end*/
