import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { NgChartsModule } from 'ng2-charts';
import { ChartOptions, ChartDataset } from 'chart.js';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [NgChartsModule],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.css',
})
export class PieChartComponent {
  @Input() pieChartOptions: ChartOptions<any>;
  @Input() pieChartLabels: string[];
  @Input() pieChartDatasets: ChartDataset[];
  @Input() pieChartLegend: boolean | undefined;
  @Input() pieChartPlugins: Array<any>;

  constructor(private cdr: ChangeDetectorRef) {}

  updateChartData(newData: ChartDataset[]) {
    // Update chart data
    this.pieChartDatasets = newData;

    // Trigger change detection to update the UI
    this.cdr.detectChanges();
  }
}
