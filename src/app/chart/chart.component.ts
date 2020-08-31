import { Component, OnInit } from '@angular/core';
import * as CanvasJS from '../Chart 2.3.2 GA - Stable/canvasjs.min';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit
{
  op: any;
  x: any;
  y: any;
  chartsForm: FormGroup;
  theme: string = "light2";

  constructor()
  {

  }

  ngOnInit(): void
  {

    this.op = '';
    this.chartsForm = new FormGroup(
      {
        number1: new FormControl(),
        number2: new FormControl(),
        operator: new FormControl()
      }
    );
    console.log(this.chartsForm);
  }

  renderChart(x, y, result, theme)
  {
    let chart = new CanvasJS.Chart("chartContainer",
    {
      theme: theme,
      animationEnabled: false,
      exportEnabled: false,
      title:{
        text: "Monthly Expense"
      },
      data: [{
        type: "pie",
        showInLegend: true,
        toolTipContent: "<b>{name}</b>: ${y} (#percent%)",
        indexLabel: "{name} - #percent%",
        dataPoints: [
          { y: x, name: "Food" },
          { y: y, name: "Insurance" },
          { y: result, name: "Traveling" },
        ]
      }]
    });

    chart.render();
  }

  onSubmit(): void
  {
    console.log(this.chartsForm);
    this.x = this.chartsForm.value.number1;
    this.y = this.chartsForm.value.number2;
    this.op = this.chartsForm.value.operator;
    this.renderChart(this.x, this.y, eval(this.x + this.op + this.y), this.theme);
  }

  switchThemes(elem: any, submitbutton: any, container: any, row: any)
  {
    if(elem.className == " ")
    {
      elem.className = "alternate-theme"
    }
    else
    {
      elem.className = " ";
    }

    if(container.className == "container")
    {
      container.className = "container-alternate"
    }
    else
    {
      container.className = "container";
    }

    if(submitbutton.className == " ")
    {
      submitbutton.className = "alternate-theme"
    }
    else
    {
      submitbutton.className = " ";
    }

    if(this.theme == "dark2")
    {
      this.theme = "light2";
    }
    else
    {
      this.theme = "dark2";
    }

    this.renderChart(this.x, this.y,eval(this.x + this.op + this.y) , this.theme);
  }

}
