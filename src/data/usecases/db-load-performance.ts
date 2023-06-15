import {
  LoadCountInfosTasksRepository,
  LoadPerformanceRepository,
} from '@/data/protocols/repositories';
import { LoadPerformance } from '@/domain/usecases';
import { Calculation, Format } from '@/utils/protocols';

export class DbLoadPerformance implements LoadPerformance {
  constructor(
    private readonly loadPerformanceRepository: LoadPerformanceRepository,
    private readonly loadCountInfosTasksRepository: LoadCountInfosTasksRepository,
    private readonly formatMinutesToHourString: Format<number, string>,
    private readonly calculationPercentage: Calculation<
      Calculation.ParamsPercentage,
      number
    >
  ) {}

  async load(userId: LoadPerformance.Params): Promise<LoadPerformance.Result> {
    const performance = await this.loadPerformanceRepository.load(userId);
    if (!performance) return null;
    const {
      minutesOfFocus,
      minutesOfRest,
      minutesOnImportantTasks,
      minutesOnUrgentTasks,
    } = performance;
    const totalTimeOfFocus =
      this.formatMinutesToHourString.format(minutesOfFocus);
    const totalTimeOfRest =
      this.formatMinutesToHourString.format(minutesOfRest);
    const totalTimeImportantTasks = this.formatMinutesToHourString.format(
      minutesOnImportantTasks
    );
    const totalTimeUrgentTasks =
      this.formatMinutesToHourString.format(minutesOnUrgentTasks);
    const focusTimePercentage = this.calculationPercentage.calculate({
      totalAmount: minutesOfFocus + minutesOfRest,
      valueToFind: minutesOfFocus,
    });
    const { totalImportantTasks, totalNotImportantTasks } =
      await this.loadCountInfosTasksRepository.load(userId);
    const percentageImportantTasks = this.calculationPercentage.calculate({
      totalAmount: totalImportantTasks + totalNotImportantTasks,
      valueToFind: totalImportantTasks,
    });
    return {
      totalTimeOfFocus,
      totalTimeOfRest,
      totalTimeImportantTasks,
      totalTimeUrgentTasks,
      focusTimePercentage,
      percentageImportantTasks,
      percentageNotImportantTasks: 100 - percentageImportantTasks,
    };
  }
}
