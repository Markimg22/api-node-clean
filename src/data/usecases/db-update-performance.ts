import { UpdatePerformanceRepository } from '@/data/protocols/repositories';
import { UpdatePerformance } from '@/domain/usecases';
import { Format } from '@/utils/protocols';

export class DbUpdatePerformance implements UpdatePerformance {
  constructor(
    private readonly updatePerformanceRepository: UpdatePerformanceRepository,
    private readonly formatHourStringToMinutes: Format<string, number>
  ) {}

  async update(
    params: UpdatePerformance.Params
  ): Promise<UpdatePerformance.Result> {
    const {
      userId,
      totalTimeOfFocus,
      totalTimeOfRest,
      totalTimeImportantTasks,
      totalTimeUrgentTasks,
    } = params;
    await this.updatePerformanceRepository.update({
      userId,
      minutesOfFocus: this.formatHourStringToMinutes.format(totalTimeOfFocus),
      minutesOfRest: this.formatHourStringToMinutes.format(totalTimeOfRest),
      minutesOnImportantTasks: this.formatHourStringToMinutes.format(
        totalTimeImportantTasks
      ),
      minutesOnUrgentTasks:
        this.formatHourStringToMinutes.format(totalTimeUrgentTasks),
    });
  }
}
